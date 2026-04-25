// =============================================================================
// FlowLedger SDK — interceptor.js
// JIT Micro-Lending Interceptor for AI Agents
// =============================================================================

const axios = require("axios");
const {
  makeContractCall,
  uintCV,
  stringAsciiCV,
  principalCV,
  AnchorMode,
  PostConditionMode,
  FungibleConditionCode,
  createAssetInfo,
  makeContractFungiblePostCondition,
  makeStandardFungiblePostCondition,
  txidFromData,
  callReadOnlyFunction,
  cvToJSON,
} = require("@stacks/transactions");
const { StacksMainnet, StacksTestnet } = require("@stacks/network");

const {
  DEFAULT_DIA_ORACLE_CONTRACT,
  DEFAULT_SBTC_CONTRACT,
  DEFAULT_USDCX_CONTRACT,
  DIA_SBTC_PAIR,
  splitContractId,
} = require("./network_utils");

const {
  buildPaymentSignatureHeader,
  parsePaymentRequiredHeader,
  parsePaymentResponseHeader,
  PAYMENT_REQUIRED_HEADER,
  PAYMENT_RESPONSE_HEADER,
  PAYMENT_SIGNATURE_HEADER,
} = require("./x402_utils");

// ---------------------------------------------------------------------------
// CONSTANTS
// ---------------------------------------------------------------------------

const DEFAULT_TIMEOUT_MS = 55_000;
const DEFAULT_MAX_RETRIES = 1;
const COLLATERAL_RATIO_BPS = 15_000n; // 150%
const PROTOCOL_FEE_BPS = 30n;
const USDCX_PRICE_USD8 = 100_000_000n; // $1.00
const MAX_ORACLE_AGE_SECONDS = 60n;
const DEFAULT_TX_FEE = 100_000n; // 0.1 STX

// ---------------------------------------------------------------------------
// HELPER UTILITIES
// ---------------------------------------------------------------------------

function parseAmountUsdcx(option) {
  const explicitPrice = option.extra?.priceUsdcx;
  if (typeof explicitPrice === "number" && Number.isFinite(explicitPrice)) {
    return explicitPrice;
  }

  if (/^\d+$/.test(option.amount)) {
    return Number.parseInt(option.amount, 10);
  }

  return Math.round(Number.parseFloat(option.amount) * 1_000_000);
}

function getNetworkKey(caip2Network) {
  return caip2Network === "stacks:1" ? "mainnet" : "testnet";
}

function buildLiveBorrowPreview(amountUsdcx, sbtcPriceUsd8) {
  const requiredUsdcxValue = (amountUsdcx * COLLATERAL_RATIO_BPS) / 10_000n;
  const collateralNumerator = requiredUsdcxValue * USDCX_PRICE_USD8 * 100n;
  const requiredCollateralSbtc = (collateralNumerator + sbtcPriceUsd8 - 1n) / sbtcPriceUsd8;
  const originationFeeUsdcx = (amountUsdcx * PROTOCOL_FEE_BPS) / 10_000n;

  return {
    required_collateral_sbtc: requiredCollateralSbtc,
    origination_fee_usdcx: originationFeeUsdcx,
    net_payment_usdcx: amountUsdcx - originationFeeUsdcx,
    sbtc_price_usd8: sbtcPriceUsd8,
    usdcx_price_usd8: USDCX_PRICE_USD8,
    collateral_ratio_bps: COLLATERAL_RATIO_BPS,
  };
}

async function getLiveSbtcPriceUsd8(config) {
  const contractId = DEFAULT_DIA_ORACLE_CONTRACT[getNetworkKey(config.caip2Network)];
  const { address, name } = splitContractId(contractId);

  const result = await callReadOnlyFunction({
    contractAddress: address,
    contractName: name,
    functionName: "get-value",
    functionArgs: [stringAsciiCV(DIA_SBTC_PAIR)],
    network: config.network,
    senderAddress: config.agentAddress,
  });

  const json = cvToJSON(result);

  if (!json.success && json.type !== "(ok tuple)") {
    throw new Error(`DIA get-value returned error: ${JSON.stringify(json)}`);
  }

  const inner = json.value;
  const fields = inner.value || inner;
  const priceUsd8 = BigInt(fields.value.value);
  const timestamp = BigInt(fields.timestamp.value);
  const now = BigInt(Math.floor(Date.now() / 1000));

  if (priceUsd8 <= 0n) {
    throw new Error("DIA oracle returned zero sBTC price");
  }

  if (now > timestamp && now - timestamp > MAX_ORACLE_AGE_SECONDS) {
    throw new Error("DIA oracle price is stale");
  }

  return priceUsd8;
}

function emit(onEvent, type, data) {
  if (onEvent) {
    onEvent({ type, timestamp: Date.now(), data });
  }
}

// ---------------------------------------------------------------------------
// STACKS READ-ONLY: simulate-borrow
// ---------------------------------------------------------------------------

async function simulateBorrow(amountUsdcx, config) {
  try {
    const result = await callReadOnlyFunction({
      contractAddress: config.vaultContractAddress,
      contractName: config.vaultContractName,
      functionName: "simulate-borrow",
      functionArgs: [uintCV(amountUsdcx)],
      network: config.network,
      senderAddress: config.agentAddress,
    });

    const json = cvToJSON(result);

    if (!json.success && json.type !== "(ok tuple)") {
      throw new Error(`simulate-borrow returned error: ${JSON.stringify(json.value)}`);
    }

    const inner = json.value;
    const v = inner.value || inner;

    return {
      required_collateral_sbtc: BigInt(v["required-collateral-sbtc"].value),
      origination_fee_usdcx: BigInt(v["origination-fee-usdcx"].value),
      net_payment_usdcx: BigInt(v["net-payment-usdcx"].value),
      sbtc_price_usd8: BigInt(v["sbtc-price-usd8"].value),
      usdcx_price_usd8: BigInt(v["usdcx-price-usd8"].value),
      collateral_ratio_bps: BigInt(v["collateral-ratio-bps"].value),
    };
  } catch (err) {
    const sbtcPriceUsd8 = await getLiveSbtcPriceUsd8(config);
    return buildLiveBorrowPreview(amountUsdcx, sbtcPriceUsd8);
  }
}

// ---------------------------------------------------------------------------
// STACKS TX BUILDER: borrow-and-pay
// ---------------------------------------------------------------------------

async function buildAndSignBorrowAndPay(
  amountUsdcx,
  merchantAddress,
  collateralSbtc,
  netPayment,
  config
) {
  const sbtcAssetInfo = createAssetInfo(
    config.sbtcContractAddress,
    config.sbtcContractName,
    "sbtc-token"
  );

  const usdcxAssetInfo = createAssetInfo(
    config.usdcxContractAddress,
    config.usdcxContractName,
    "usdcx-token"
  );

  const txOptions = {
    contractAddress: config.vaultContractAddress,
    contractName: config.vaultContractName,
    functionName: "borrow-and-pay",
    functionArgs: [
      uintCV(amountUsdcx),
      principalCV(merchantAddress),
      uintCV(collateralSbtc),
    ],
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Deny,
    postConditions: [
      makeStandardFungiblePostCondition(
        config.agentAddress,
        FungibleConditionCode.Equal,
        collateralSbtc,
        sbtcAssetInfo
      ),
      makeContractFungiblePostCondition(
        config.vaultContractAddress,
        config.vaultContractName,
        FungibleConditionCode.Equal,
        netPayment,
        usdcxAssetInfo
      ),
    ],
    senderKey: config.privateKey,
    network: config.network,
    fee: DEFAULT_TX_FEE,
  };

  const tx = await makeContractCall(txOptions);
  return tx;
}

// ---------------------------------------------------------------------------
// THE INTERCEPTOR
// ---------------------------------------------------------------------------

function attachPaymentInterceptor(axiosInstance, config) {
  const maxRetries = config.maxPaymentRetries ?? DEFAULT_MAX_RETRIES;

  axiosInstance.interceptors.response.use(
    (response) => {
      const paymentResponse = response.headers[PAYMENT_RESPONSE_HEADER];
      if (paymentResponse) {
        const pr = parsePaymentResponseHeader(paymentResponse);
        emit(config.onEvent, "PAYMENT_CONFIRMED", {
          txid: pr.transaction,
          block_height: pr.blockHeight,
          confirmed_at: pr.confirmedAt,
          payer: pr.payer,
        });
      }
      return response;
    },

    async (error) => {
      if (!axios.isAxiosError(error)) throw error;

      const originalRequest = error.config;
      if (error.response?.status !== 402) throw error;

      const retryCount = originalRequest._paymentRetryCount ?? 0;
      if (retryCount >= maxRetries) {
        const settlementError = error.response?.data?.error;
        const detail = typeof settlementError === "string" ? `: ${settlementError}` : "";
        throw new Error(
          `FlowLedger: max payment retries (${maxRetries}) exceeded for ${originalRequest.url}${detail}`
        );
      }
      originalRequest._paymentRetryCount = retryCount + 1;

      // ── Stage 1: Parse challenge ──────────────────────────────────────────
      const header402 = error.response.headers[PAYMENT_REQUIRED_HEADER];
      const body402 = header402
        ? parsePaymentRequiredHeader(header402)
        : error.response.data;

      if (!body402 || body402.x402Version !== 2 || !Array.isArray(body402.accepts)) {
        throw new Error("FlowLedger: invalid x402 V2 PaymentRequiredBody");
      }

      const option = body402.accepts.find(
        (o) => o.scheme === "exact" && o.network === config.caip2Network
      );
      if (!option) {
        throw new Error(`FlowLedger: no payment option for network ${config.caip2Network}`);
      }

      const priceUsdcx = parseAmountUsdcx(option);
      emit(config.onEvent, "PAYMENT_REQUIRED_RECEIVED", {
        resource: body402.resource.url,
        amount_usdcx: priceUsdcx,
        merchant_address: option.payTo,
      });

      const amountUsdcx = BigInt(priceUsdcx);

      // ── Stage 2: Simulation ───────────────────────────────────────────────
      const simulation = await simulateBorrow(amountUsdcx, config);
      emit(config.onEvent, "SIMULATE_BORROW_OK", {
        required_collateral_sbtc: simulation.required_collateral_sbtc.toString(),
      });

      // ── Stage 3: Build & Sign ─────────────────────────────────────────────
      const collateralSbtc = simulation.required_collateral_sbtc + 1n;
      const signedTx = await buildAndSignBorrowAndPay(
        amountUsdcx,
        option.payTo,
        collateralSbtc,
        simulation.net_payment_usdcx,
        config
      );

      // ── Stage 4: Serialize ───────────────────────────────────────────────
      const serialized = Buffer.from(signedTx.serialize()).toString("hex");
      const txid = `0x${txidFromData(Buffer.from(serialized, "hex"))}`;
      emit(config.onEvent, "TX_SIGNED", { payment_identifier: txid });

      // ── Stage 5: Encode Header ────────────────────────────────────────────
      const encodedPayment = buildPaymentSignatureHeader({
        resource: body402.resource,
        accepted: option,
        signedTransactionHex: serialized,
        paymentIdentifier: txid,
      });

      // ── Stage 6: Retry ───────────────────────────────────────────────────
      originalRequest.headers[PAYMENT_SIGNATURE_HEADER] = encodedPayment;
      emit(config.onEvent, "REQUEST_RETRIED", { url: originalRequest.url });

      return axiosInstance(originalRequest);
    }
  );
}

// ---------------------------------------------------------------------------
// PUBLIC FACTORY
// ---------------------------------------------------------------------------

function withPaymentInterceptor(config, axiosConfig) {
  const instance = axios.create({
    timeout: config.timeoutMs ?? DEFAULT_TIMEOUT_MS,
    ...axiosConfig,
  });

  instance.interceptors.request.use((req) => {
    emit(config.onEvent, "REQUEST_SENT", { url: req.url, method: req.method });
    return req;
  });

  attachPaymentInterceptor(instance, config);
  return instance;
}

function mainnetConfig() {
  const sbtc = splitContractId(DEFAULT_SBTC_CONTRACT.mainnet);
  const usdcx = splitContractId(DEFAULT_USDCX_CONTRACT.mainnet);

  return {
    network: new StacksMainnet(),
    caip2Network: "stacks:1",
    sbtcContractAddress: sbtc.address,
    sbtcContractName: sbtc.name,
    usdcxContractAddress: usdcx.address,
    usdcxContractName: usdcx.name,
  };
}

function testnetConfig() {
  const sbtc = splitContractId(DEFAULT_SBTC_CONTRACT.testnet);
  const usdcx = splitContractId(DEFAULT_USDCX_CONTRACT.testnet);

  return {
    network: new StacksTestnet(),
    caip2Network: "stacks:2147483648",
    sbtcContractAddress: sbtc.address,
    sbtcContractName: sbtc.name,
    usdcxContractAddress: usdcx.address,
    usdcxContractName: usdcx.name,
  };
}

module.exports = {
  withPaymentInterceptor,
  mainnetConfig,
  testnetConfig,
};
