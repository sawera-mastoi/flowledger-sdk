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

<!-- SDK Documentation update #22 -->

<!-- SDK Documentation update #23 -->

<!-- SDK Documentation update #27 -->

<!-- SDK Documentation update #28 -->

<!-- SDK Documentation update #29 -->

<!-- SDK Documentation update #31 -->

<!-- SDK Documentation update #38 -->

<!-- SDK Documentation update #45 -->

<!-- SDK Documentation update #48 -->

<!-- SDK Documentation update #52 -->

<!-- SDK Documentation update #54 -->

<!-- SDK Documentation update #58 -->

<!-- SDK Documentation update #60 -->

<!-- SDK Documentation update #62 -->

<!-- SDK Documentation update #63 -->

<!-- SDK Documentation update #65 -->

<!-- SDK Documentation update #67 -->

<!-- SDK Documentation update #68 -->

<!-- SDK Documentation update #70 -->

<!-- SDK Documentation update #76 -->

<!-- SDK Documentation update #78 -->

<!-- SDK Documentation update #79 -->

<!-- SDK Documentation update #81 -->

<!-- SDK Documentation update #83 -->

<!-- SDK Documentation update #86 -->

<!-- SDK Documentation update #87 -->

<!-- SDK Documentation update #91 -->

<!-- SDK Documentation update #92 -->

<!-- SDK Documentation update #95 -->

<!-- SDK Documentation update #99 -->

<!-- SDK Documentation update #103 -->

<!-- SDK Documentation update #108 -->

<!-- SDK Documentation update #111 -->

<!-- SDK Documentation update #114 -->

<!-- SDK Documentation update #115 -->

<!-- SDK Documentation update #118 -->

<!-- SDK Documentation update #119 -->

<!-- SDK Documentation update #122 -->

<!-- SDK Documentation update #124 -->

<!-- SDK Documentation update #125 -->

<!-- SDK Documentation update #127 -->

<!-- SDK Documentation update #131 -->

<!-- SDK Documentation update #137 -->

<!-- SDK Documentation update #140 -->

<!-- SDK Documentation update #142 -->

<!-- SDK Documentation update #145 -->

<!-- SDK Documentation update #151 -->

<!-- SDK Documentation update #152 -->

<!-- SDK Documentation update #153 -->

<!-- SDK Documentation update #157 -->

<!-- SDK Documentation update #162 -->

<!-- SDK Documentation update #168 -->

<!-- SDK Documentation update #171 -->

<!-- SDK Documentation update #172 -->

<!-- SDK Documentation update #175 -->

<!-- SDK Documentation update #176 -->

<!-- SDK Documentation update #183 -->

<!-- SDK Documentation update #185 -->

<!-- SDK Documentation update #186 -->

<!-- SDK Documentation update #191 -->

<!-- SDK Documentation update #197 -->

<!-- SDK Documentation update #200 -->

<!-- SDK Documentation update #209 -->

<!-- SDK Documentation update #212 -->

<!-- SDK Documentation update #217 -->

<!-- SDK Documentation update #224 -->

<!-- SDK Documentation update #226 -->

<!-- SDK Documentation update #229 -->

<!-- SDK Documentation update #235 -->

<!-- SDK Documentation update #237 -->

<!-- SDK Documentation update #240 -->

<!-- SDK Documentation update #243 -->

<!-- SDK Documentation update #244 -->

<!-- SDK Documentation update #250 -->

<!-- SDK Documentation update #251 -->

<!-- SDK Documentation update #254 -->

<!-- SDK Documentation update #255 -->

<!-- SDK Documentation update #256 -->

<!-- SDK Documentation update #257 -->

<!-- SDK Documentation update #260 -->

<!-- SDK Documentation update #264 -->

<!-- SDK Documentation update #269 -->

<!-- SDK Documentation update #270 -->

<!-- SDK Documentation update #271 -->

<!-- SDK Documentation update #274 -->

<!-- SDK Documentation update #277 -->

<!-- SDK Documentation update #279 -->

<!-- SDK Documentation update #288 -->

<!-- SDK Documentation update #290 -->

<!-- SDK Documentation update #291 -->

<!-- SDK Documentation update #296 -->
