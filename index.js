/**
 * @earnwithalee/stacks-echo-kit
 * A lightweight utility toolkit for the Stacks blockchain ecosystem.
 *
 * Features:
 * - STX amount formatting & conversion (microSTX ↔ STX)
 * - Stacks address validation & truncation
 * - Transaction status helpers
 * - Price & portfolio utilities
 * - Network configuration (mainnet / testnet / devnet)
 * - Epoch & block time calculators
 *
 * @author earnwithalee <earnwithalee@gmail.com>
 * @license MIT
 */

"use strict";

// ─────────────────────────────────────────────
//  Constants
// ─────────────────────────────────────────────

const MICRO_STX = 1_000_000;

const NETWORKS = {
  mainnet: {
    name: "mainnet",
    chainId: 1,
    url: "https://stacks-node-api.mainnet.stacks.co",
    explorerUrl: "https://explorer.hiro.so",
    broadcastEndpoint: "/v2/transactions",
  },
  testnet: {
    name: "testnet",
    chainId: 2147483648,
    url: "https://stacks-node-api.testnet.stacks.co",
    explorerUrl: "https://explorer.hiro.so/?chain=testnet",
    broadcastEndpoint: "/v2/transactions",
  },
  devnet: {
    name: "devnet",
    chainId: 2147483648,
    url: "http://localhost:3999",
    explorerUrl: "http://localhost:8000",
    broadcastEndpoint: "/v2/transactions",
  },
};

const TX_STATUS = {
  PENDING: "pending",
  SUCCESS: "success",
  ABORT_BY_RESPONSE: "abort_by_response",
  ABORT_BY_POST_CONDITION: "abort_by_post_condition",
  DROPPED: "dropped_replace_by_fee",
};

// ─────────────────────────────────────────────
//  Exports
// ─────────────────────────────────────────────

module.exports = {
  // Constants
  MICRO_STX,
  NETWORKS,
  TX_STATUS,

  // STX Amounts
  microToStx,
  stxToMicro,
  formatStx,
  formatCompact,

  // Address
  isValidAddress,
  getAddressNetwork,
  truncateAddress,
  getExplorerAddressUrl,

  // Transactions
  isTxSuccess,
  isTxFailed,
  isTxPending,
  getExplorerTxUrl,
  formatTxAmount,

  // Price & Portfolio
  calcUsdValue,
  calcPriceChange,
  calcPortfolioAllocation,

  // Network
  getNetwork,
  buildApiUrl,

  // Block & Epoch
  estimateBlockTime,
  calcEpochProgress,

  // Time
  timeAgo,

  // Lending & x402 (Branded & Lightweight)
  ...require("./src/constants"),
  ...require("./src/x402"),
  ...require("./src/lending"),
};
