// =============================================================================
// FlowLedger SDK — network_utils.js
// Well-known Stacks contract addresses and network utilities.
// =============================================================================

const DEFAULT_USDCX_CONTRACT = {
  mainnet: "SP120SBRBQJ00MCWS7TM5R8WJNTTKD5K0HFRC2CNE.usdcx",
  testnet: "ST1PQHQK6K7Y0ZYMY2E61HW3D8B8JV2QDN64STJHH.usdcx",
};

const DEFAULT_SBTC_CONTRACT = {
  mainnet: "SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token",
  testnet: "ST2PABAF9FTAJYNFZH93XENAJ8FVY99RRM4CB2WDX.sbtc-token",
};

const DEFAULT_DIA_ORACLE_CONTRACT = {
  mainnet: "SP1G48FZ4Y7JY8G2Z0N51QTCYGBQ6F4J43J77BQC0.dia-oracle",
  testnet: "ST2HKGJ8CY0YFNCH7A69GAMXKPGTAKDG0D0M0F4FZ.dia-oracle",
};

const DIA_SBTC_PAIR = "sBTC/USD";

function splitContractId(contractId) {
  const [address, name] = contractId.split(".");

  if (!address || !name) {
    throw new Error(`Invalid contract identifier: ${contractId}`);
  }

  return { address, name };
}

function normalizeTxid(txid) {
  const trimmed = txid.trim();
  return trimmed.startsWith("0x") ? trimmed : `0x${trimmed}`;
}

module.exports = {
  DEFAULT_USDCX_CONTRACT,
  DEFAULT_SBTC_CONTRACT,
  DEFAULT_DIA_ORACLE_CONTRACT,
  DIA_SBTC_PAIR,
  splitContractId,
  normalizeTxid,
};
