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
//  STX Amount Utilities
// ─────────────────────────────────────────────

/**
 * Convert microSTX to STX.
 * @param {number|string} microStx - Amount in microSTX.
 * @returns {number} Amount in STX.
 */
function microToStx(microStx) {
  const value = typeof microStx === "string" ? parseInt(microStx, 10) : microStx;
  if (isNaN(value)) throw new Error("Invalid microSTX value");
  return value / MICRO_STX;
}

/**
 * Convert STX to microSTX.
 * @param {number|string} stx - Amount in STX.
 * @returns {number} Amount in microSTX.
 */
function stxToMicro(stx) {
  const value = typeof stx === "string" ? parseFloat(stx) : stx;
  if (isNaN(value)) throw new Error("Invalid STX value");
  return Math.round(value * MICRO_STX);
}

/**
 * Format an STX amount for display with optional decimals.
 * @param {number} stx - Amount in STX.
 * @param {number} [decimals=2] - Decimal places.
 * @returns {string} Formatted string like "1,234.56 STX".
 */
function formatStx(stx, decimals = 2) {
  return (
    stx.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) + " STX"
  );
}

/**
 * Format a large number with K/M/B suffixes.
 * @param {number} num - The number to format.
 * @param {number} [decimals=1] - Decimal places.
 * @returns {string} Formatted string like "1.2B" or "142.5K".
 */
function formatCompact(num, decimals = 1) {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(decimals) + "B";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(decimals) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(decimals) + "K";
  return num.toString();
}

// ─────────────────────────────────────────────
//  Address Utilities
// ─────────────────────────────────────────────

/**
 * Validate a Stacks address format.
 * Checks for SP (mainnet) or ST (testnet) prefix and valid length.
 * @param {string} address - Stacks address string.
 * @returns {boolean} True if the address format is valid.
 */
function isValidAddress(address) {
  if (typeof address !== "string") return false;
  const trimmed = address.trim();
  const validPrefix = trimmed.startsWith("SP") || trimmed.startsWith("ST");
  const validLength = trimmed.length >= 28 && trimmed.length <= 41;
  const validChars = /^[A-Z0-9]+$/.test(trimmed);
  return validPrefix && validLength && validChars;
}

/**
 * Detect whether an address is mainnet or testnet.
 * @param {string} address - Stacks address.
 * @returns {"mainnet"|"testnet"|null} Network type or null if invalid.
 */
function getAddressNetwork(address) {
  if (!isValidAddress(address)) return null;
  return address.startsWith("SP") ? "mainnet" : "testnet";
}

/**
 * Truncate a Stacks address for display.
 * @param {string} address - Full Stacks address.
 * @param {number} [startChars=4] - Characters to show at start.
 * @param {number} [endChars=4] - Characters to show at end.
 * @returns {string} Truncated address like "SP2X...4X9Z".
 */
function truncateAddress(address, startChars = 4, endChars = 4) {
  if (!address || address.length <= startChars + endChars + 3) return address || "";
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Build a Hiro Explorer URL for an address.
 * @param {string} address - Stacks address.
 * @param {"mainnet"|"testnet"} [network="mainnet"] - Network.
 * @returns {string} Explorer URL.
 */
function getExplorerAddressUrl(address, network = "mainnet") {
  const base = NETWORKS[network]?.explorerUrl || NETWORKS.mainnet.explorerUrl;
  return `${base}/address/${address}`;
}

// ─────────────────────────────────────────────
//  Transaction Utilities
// ─────────────────────────────────────────────

/**
 * Check if a transaction status indicates success.
 * @param {string} status - Transaction status string.
 * @returns {boolean}
 */
function isTxSuccess(status) {
  return status === TX_STATUS.SUCCESS;
}

/**
 * Check if a transaction status indicates failure.
 * @param {string} status - Transaction status string.
 * @returns {boolean}
 */
function isTxFailed(status) {
  return (
    status === TX_STATUS.ABORT_BY_RESPONSE ||
    status === TX_STATUS.ABORT_BY_POST_CONDITION
  );
}

/**
 * Check if a transaction is still pending.
 * @param {string} status - Transaction status string.
 * @returns {boolean}
 */
function isTxPending(status) {
  return status === TX_STATUS.PENDING;
}

/**
 * Build a Hiro Explorer URL for a transaction.
 * @param {string} txId - Transaction ID (with or without 0x prefix).
 * @param {"mainnet"|"testnet"} [network="mainnet"] - Network.
 * @returns {string} Explorer URL.
 */
function getExplorerTxUrl(txId, network = "mainnet") {
  const base = NETWORKS[network]?.explorerUrl || NETWORKS.mainnet.explorerUrl;
  const id = txId.startsWith("0x") ? txId : `0x${txId}`;
  return `${base}/txid/${id}`;
}

/**
 * Format a transaction amount for display with +/- indicator.
 * @param {number} amount - Amount in STX (positive = received, negative = sent).
 * @param {number} [decimals=2] - Decimal places.
 * @returns {{ display: string, type: "sent"|"received" }}
 */
function formatTxAmount(amount, decimals = 2) {
  const type = amount < 0 ? "sent" : "received";
  const prefix = amount < 0 ? "-" : "+";
  const absVal = Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return { display: `${prefix}${absVal} STX`, type };
}

// ─────────────────────────────────────────────
//  Price & Portfolio Utilities
// ─────────────────────────────────────────────

/**
 * Calculate USD value of an STX holding.
 * @param {number} stxAmount - Amount of STX held.
 * @param {number} priceUsd - Current STX price in USD.
 * @returns {string} Formatted USD value like "$1,234.56".
 */
function calcUsdValue(stxAmount, priceUsd) {
  const value = stxAmount * priceUsd;
  return "$" + value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/**
 * Calculate the percentage change between two prices.
 * @param {number} oldPrice - Previous price.
 * @param {number} newPrice - Current price.
 * @returns {{ percent: number, display: string, direction: "up"|"down"|"neutral" }}
 */
function calcPriceChange(oldPrice, newPrice) {
  if (oldPrice === 0) return { percent: 0, display: "0.00%", direction: "neutral" };
  const change = ((newPrice - oldPrice) / oldPrice) * 100;
  const direction = change > 0 ? "up" : change < 0 ? "down" : "neutral";
  const prefix = change > 0 ? "+" : "";
  return {
    percent: parseFloat(change.toFixed(2)),
    display: `${prefix}${change.toFixed(2)}%`,
    direction,
  };
}

/**
 * Calculate portfolio allocation percentages from holdings.
 * @param {{ name: string, amount: number }[]} holdings - Array of token holdings.
 * @returns {{ name: string, amount: number, percent: number }[]}
 */
function calcPortfolioAllocation(holdings) {
  const total = holdings.reduce((sum, h) => sum + h.amount, 0);
  if (total === 0) return holdings.map((h) => ({ ...h, percent: 0 }));
  return holdings.map((h) => ({
    ...h,
    percent: parseFloat(((h.amount / total) * 100).toFixed(2)),
  }));
}

// ─────────────────────────────────────────────
//  Network Utilities
// ─────────────────────────────────────────────

/**
 * Get network configuration by name.
 * @param {"mainnet"|"testnet"|"devnet"} name - Network name.
 * @returns {object} Network configuration object.
 */
function getNetwork(name = "mainnet") {
  return NETWORKS[name] || NETWORKS.mainnet;
}

/**
 * Build a Hiro API URL for a specific endpoint.
 * @param {string} endpoint - API endpoint path (e.g. "/extended/v1/tx").
 * @param {"mainnet"|"testnet"|"devnet"} [network="mainnet"] - Network.
 * @returns {string} Full API URL.
 */
function buildApiUrl(endpoint, network = "mainnet") {
  const net = getNetwork(network);
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${net.url}${path}`;
}

// ─────────────────────────────────────────────
//  Block & Epoch Utilities
// ─────────────────────────────────────────────

/**
 * Estimate time until a target block height.
 * Assumes ~10 minute average block time on Stacks.
 * @param {number} currentBlock - Current block height.
 * @param {number} targetBlock - Target block height.
 * @returns {{ blocks: number, minutes: number, display: string }}
 */
function estimateBlockTime(currentBlock, targetBlock) {
  const blocks = Math.max(0, targetBlock - currentBlock);
  const minutes = blocks * 10;
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let display;
  if (days > 0) display = `~${days}d ${hours % 24}h`;
  else if (hours > 0) display = `~${hours}h ${minutes % 60}m`;
  else display = `~${minutes}m`;

  return { blocks, minutes, display };
}

/**
 * Calculate epoch progress as a percentage.
 * @param {number} currentBlock - Current block in the epoch.
 * @param {number} epochStartBlock - Block height at epoch start.
 * @param {number} epochLength - Total blocks in the epoch.
 * @returns {{ progress: number, display: string }}
 */
function calcEpochProgress(currentBlock, epochStartBlock, epochLength) {
  const elapsed = Math.max(0, currentBlock - epochStartBlock);
  const progress = Math.min(100, parseFloat(((elapsed / epochLength) * 100).toFixed(1)));
  return { progress, display: `${progress}%` };
}

// ─────────────────────────────────────────────
//  Date & Time Helpers
// ─────────────────────────────────────────────

/**
 * Format a UNIX timestamp to a human-readable relative time.
 * @param {number} timestamp - UNIX timestamp in seconds.
 * @returns {string} Relative time like "5 minutes ago" or "2 days ago".
 */
function timeAgo(timestamp) {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - timestamp;

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
  return new Date(timestamp * 1000).toLocaleDateString("en-US");
}

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
};
