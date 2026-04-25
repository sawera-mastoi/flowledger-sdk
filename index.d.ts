/**
 * @earnwithalee/stacks-echo-kit
 * TypeScript definitions
 */

export declare const MICRO_STX: number;

export interface NetworkConfig {
  name: string;
  chainId: number;
  url: string;
  explorerUrl: string;
  broadcastEndpoint: string;
}

export declare const NETWORKS: {
  mainnet: NetworkConfig;
  testnet: NetworkConfig;
  devnet: NetworkConfig;
};

export declare const TX_STATUS: {
  PENDING: string;
  SUCCESS: string;
  ABORT_BY_RESPONSE: string;
  ABORT_BY_POST_CONDITION: string;
  DROPPED: string;
};

// STX Amounts
export declare function microToStx(microStx: number | string): number;
export declare function stxToMicro(stx: number | string): number;
export declare function formatStx(stx: number, decimals?: number): string;
export declare function formatCompact(num: number, decimals?: number): string;

// Address
export declare function isValidAddress(address: string): boolean;
export declare function getAddressNetwork(address: string): "mainnet" | "testnet" | null;
export declare function truncateAddress(address: string, startChars?: number, endChars?: number): string;
export declare function getExplorerAddressUrl(address: string, network?: "mainnet" | "testnet"): string;

// Transactions
export declare function isTxSuccess(status: string): boolean;
export declare function isTxFailed(status: string): boolean;
export declare function isTxPending(status: string): boolean;
export declare function getExplorerTxUrl(txId: string, network?: "mainnet" | "testnet"): string;
export declare function formatTxAmount(amount: number, decimals?: number): { display: string; type: "sent" | "received" };

// Price & Portfolio
export declare function calcUsdValue(stxAmount: number, priceUsd: number): string;
export declare function calcPriceChange(oldPrice: number, newPrice: number): { percent: number; display: string; direction: "up" | "down" | "neutral" };
export declare function calcPortfolioAllocation(holdings: { name: string; amount: number }[]): { name: string; amount: number; percent: number }[];

// Network
export declare function getNetwork(name?: "mainnet" | "testnet" | "devnet"): NetworkConfig;
export declare function buildApiUrl(endpoint: string, network?: "mainnet" | "testnet" | "devnet"): string;

// Block & Epoch
export declare function estimateBlockTime(currentBlock: number, targetBlock: number): { blocks: number; minutes: number; display: string };
export declare function calcEpochProgress(currentBlock: number, epochStartBlock: number, epochLength: number): { progress: number; display: string };

// Time
export declare function timeAgo(timestamp: number): string;
