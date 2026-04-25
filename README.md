# 🔧 stacks-echo-kit

A lightweight, zero-dependency utility toolkit for the **Stacks blockchain ecosystem**. Built for dashboard developers, DeFi tools, and Stacks dApp builders.

[![npm version](https://img.shields.io/npm/v/stacks-echo-kit.svg)](https://www.npmjs.com/package/stacks-echo-kit)
[![license](https://img.shields.io/npm/l/stacks-echo-kit.svg)](https://github.com/sawera-mastoi/flowledger-sdk/blob/main/LICENSE)

---

## 📦 Installation

```bash
npm install stacks-echo-kit
```

---

## ✨ Features

| Category | Functions |
|----------|-----------|
| **STX Amounts** | `microToStx`, `stxToMicro`, `formatStx`, `formatCompact` |
| **Address** | `isValidAddress`, `getAddressNetwork`, `truncateAddress`, `getExplorerAddressUrl` |
| **Transactions** | `isTxSuccess`, `isTxFailed`, `isTxPending`, `getExplorerTxUrl`, `formatTxAmount` |
| **Price & Portfolio** | `calcUsdValue`, `calcPriceChange`, `calcPortfolioAllocation` |
| **Network** | `getNetwork`, `buildApiUrl` |
| **Block & Epoch** | `estimateBlockTime`, `calcEpochProgress` |
| **Time** | `timeAgo` |

---

## 🚀 Quick Start

```javascript
const kit = require("stacks-echo-kit");

// Convert microSTX to STX
kit.microToStx(2500000);  // → 2.5

// Format for display
kit.formatStx(2.5);  // → "2.50 STX"
kit.formatCompact(1200000000);  // → "1.2B"

// Validate addresses
kit.isValidAddress("SP000000000000000000002Q6VF78");  // → true
kit.truncateAddress("SP000000000000000000002Q6VF78");  // → "SP00...VF78"

// Price changes
kit.calcPriceChange(2.0, 2.45);
// → { percent: 22.5, display: "+22.50%", direction: "up" }

// Portfolio allocation
kit.calcPortfolioAllocation([
  { name: "STX", amount: 45 },
  { name: "BTC", amount: 30 },
  { name: "ALEX", amount: 25 },
]);
// → [{ name: "STX", amount: 45, percent: 45 }, ...]

// Build API URLs
kit.buildApiUrl("/extended/v1/tx", "mainnet");
// → "https://stacks-node-api.mainnet.stacks.co/extended/v1/tx"

// Estimate block time
kit.estimateBlockTime(100000, 100100);
// → { blocks: 100, minutes: 1000, display: "~16h 40m" }
```

---

## 📋 API Reference

### STX Amounts

| Function | Description |
|----------|-------------|
| `microToStx(microStx)` | Convert microSTX → STX |
| `stxToMicro(stx)` | Convert STX → microSTX |
| `formatStx(stx, decimals?)` | Format STX for display (e.g. `"1,234.50 STX"`) |
| `formatCompact(num, decimals?)` | Compact number format (e.g. `"1.2B"`, `"142.5K"`) |

### Address Utilities

| Function | Description |
|----------|-------------|
| `isValidAddress(address)` | Validate SP/ST address format |
| `getAddressNetwork(address)` | Detect `"mainnet"` or `"testnet"` |
| `truncateAddress(address, start?, end?)` | Truncate to `"SP00...VF78"` |
| `getExplorerAddressUrl(address, network?)` | Build Hiro Explorer URL |

### Transaction Helpers

| Function | Description |
|----------|-------------|
| `isTxSuccess(status)` | Check if tx succeeded |
| `isTxFailed(status)` | Check if tx was aborted |
| `isTxPending(status)` | Check if tx is pending |
| `getExplorerTxUrl(txId, network?)` | Build explorer link for a tx |
| `formatTxAmount(amount, decimals?)` | Format with +/- prefix |

### Price & Portfolio

| Function | Description |
|----------|-------------|
| `calcUsdValue(stxAmount, priceUsd)` | Calculate USD value |
| `calcPriceChange(oldPrice, newPrice)` | Get % change + direction |
| `calcPortfolioAllocation(holdings)` | Compute allocation percentages |

### Network & Block

| Function | Description |
|----------|-------------|
| `getNetwork(name?)` | Get mainnet/testnet/devnet config |
| `buildApiUrl(endpoint, network?)` | Build full Hiro API URL |
| `estimateBlockTime(current, target)` | Estimate time to target block |
| `calcEpochProgress(current, start, length)` | Calculate epoch % progress |
| `timeAgo(timestamp)` | Relative time string |

---

## 🧪 Testing

```bash
npm test
```

---

## 📄 License

MIT © [earnwithalee](https://github.com/Earnwithalee7890)

---

*Part of the [Stacks Echo](https://github.com/sawera-mastoi/stacks-tue) ecosystem.*

<!-- SDK Documentation update #8 -->

<!-- SDK Documentation update #12 -->

<!-- SDK Documentation update #13 -->

<!-- SDK Documentation update #17 -->

<!-- SDK Documentation update #18 -->

<!-- SDK Documentation update #20 -->
