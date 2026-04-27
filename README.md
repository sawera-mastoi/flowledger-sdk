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

<!-- SDK Documentation update #297 -->

<!-- SDK Documentation update #299 -->

<!-- SDK Documentation update #302 -->

<!-- SDK Documentation update #308 -->

<!-- SDK Documentation update #311 -->

<!-- SDK Documentation update #312 -->

<!-- SDK Documentation update #313 -->

<!-- SDK Documentation update #327 -->

<!-- SDK Documentation update #331 -->

<!-- SDK Documentation update #333 -->

<!-- SDK Documentation update #341 -->

<!-- SDK Documentation update #342 -->

<!-- SDK Documentation update #344 -->

<!-- SDK Documentation update #345 -->

<!-- SDK Documentation update #348 -->

<!-- SDK Documentation update #349 -->

<!-- SDK Documentation update #351 -->

<!-- SDK Documentation update #352 -->

<!-- SDK Documentation update #354 -->

<!-- SDK Documentation update #356 -->

<!-- SDK Documentation update #358 -->

<!-- SDK Documentation update #360 -->

<!-- SDK Documentation update #362 -->

<!-- SDK Documentation update #364 -->

<!-- SDK Documentation update #365 -->

<!-- SDK Documentation update #369 -->

<!-- SDK Documentation update #370 -->

<!-- SDK Documentation update #371 -->

<!-- SDK Documentation update #373 -->

<!-- SDK Documentation update #374 -->

<!-- SDK Documentation update #379 -->

<!-- SDK Documentation update #380 -->

<!-- SDK Documentation update #381 -->

<!-- SDK Documentation update #384 -->

<!-- SDK Documentation update #388 -->

<!-- SDK Documentation update #390 -->

<!-- SDK Documentation update #395 -->

<!-- SDK Documentation update #399 -->

<!-- SDK Documentation update #400 -->

<!-- SDK Documentation update #402 -->

<!-- SDK Documentation update #410 -->

<!-- SDK Documentation update #412 -->

<!-- SDK Documentation update #416 -->

<!-- SDK Documentation update #424 -->

<!-- SDK Documentation update #425 -->

<!-- SDK Documentation update #426 -->

<!-- SDK Documentation update #428 -->

<!-- SDK Documentation update #432 -->

<!-- SDK Documentation update #435 -->

<!-- SDK Documentation update #438 -->

<!-- SDK Documentation update #440 -->

<!-- SDK Documentation update #441 -->

<!-- SDK Documentation update #442 -->

<!-- SDK Documentation update #447 -->

<!-- SDK Documentation update #452 -->

<!-- SDK Documentation update #453 -->

<!-- SDK Documentation update #456 -->

<!-- SDK Documentation update #461 -->

<!-- SDK Documentation update #462 -->

<!-- SDK Documentation update #463 -->

<!-- SDK Documentation update #467 -->

<!-- SDK Documentation update #469 -->

<!-- SDK Documentation update #470 -->

<!-- SDK Documentation update #475 -->

<!-- SDK Documentation update #477 -->

<!-- SDK Documentation update #480 -->

<!-- SDK Documentation update #481 -->

<!-- SDK Documentation update #486 -->

<!-- SDK Documentation update #488 -->

<!-- SDK Documentation update #490 -->

<!-- SDK Documentation update #495 -->

<!-- SDK Documentation update #497 -->

<!-- SDK Documentation update #498 -->

<!-- SDK Documentation update #500 -->

<!-- SDK Documentation update #503 -->

<!-- SDK Documentation update #505 -->

<!-- SDK Documentation update #508 -->

<!-- SDK Documentation update #510 -->

<!-- SDK Documentation update #515 -->

<!-- SDK Documentation update #516 -->

<!-- SDK Documentation update #520 -->

<!-- SDK Documentation update #523 -->

<!-- SDK Documentation update #527 -->

<!-- SDK Documentation update #530 -->

<!-- SDK Documentation update #531 -->

<!-- SDK Documentation update #537 -->

<!-- SDK Documentation update #538 -->

<!-- SDK Documentation update #547 -->

<!-- SDK Documentation update #550 -->

<!-- SDK Documentation update #553 -->

<!-- SDK Documentation update #565 -->

<!-- SDK Documentation update #575 -->

<!-- SDK Documentation update #577 -->

<!-- SDK Documentation update #580 -->

<!-- SDK Documentation update #581 -->

<!-- SDK Documentation update #584 -->

<!-- SDK Documentation update #586 -->

<!-- SDK Documentation update #592 -->

<!-- SDK Documentation update #595 -->

<!-- SDK Documentation update #597 -->

<!-- SDK Documentation update #603 -->

<!-- SDK Documentation update #604 -->

<!-- SDK Documentation update #607 -->

<!-- SDK Documentation update #608 -->

<!-- SDK Documentation update #610 -->

<!-- SDK Documentation update #612 -->

<!-- SDK Documentation update #617 -->

<!-- SDK Documentation update #620 -->

<!-- SDK Documentation update #632 -->

<!-- SDK Documentation update #633 -->

<!-- SDK Documentation update #634 -->

<!-- SDK Documentation update #636 -->

<!-- SDK Documentation update #637 -->

<!-- SDK Documentation update #638 -->

<!-- SDK Documentation update #644 -->

<!-- SDK Documentation update #645 -->

<!-- SDK Documentation update #646 -->

<!-- SDK Documentation update #647 -->

<!-- SDK Documentation update #650 -->

<!-- SDK Documentation update #651 -->

<!-- SDK Documentation update #653 -->

<!-- SDK Documentation update #661 -->

<!-- SDK Documentation update #663 -->

<!-- SDK Documentation update #664 -->

<!-- SDK Documentation update #667 -->

<!-- SDK Documentation update #671 -->

<!-- SDK Documentation update #678 -->

<!-- SDK Documentation update #681 -->

<!-- SDK Documentation update #687 -->

<!-- SDK Documentation update #689 -->

<!-- SDK Documentation update #690 -->

<!-- SDK Documentation update #691 -->

<!-- SDK Documentation update #692 -->

<!-- SDK Documentation update #700 -->

<!-- SDK Documentation update #702 -->

<!-- SDK Documentation update #703 -->

<!-- SDK Documentation update #704 -->

<!-- SDK Documentation update #705 -->

<!-- SDK Documentation update #707 -->

<!-- SDK Documentation update #708 -->

<!-- SDK Documentation update #714 -->

<!-- SDK Documentation update #725 -->

<!-- SDK Documentation update #730 -->

<!-- SDK Documentation update #738 -->

<!-- SDK Documentation update #743 -->

<!-- SDK Documentation update #745 -->

<!-- SDK Documentation update #747 -->

<!-- SDK Documentation update #749 -->

<!-- SDK Documentation update #755 -->

<!-- SDK Documentation update #757 -->

<!-- SDK Documentation update #766 -->

<!-- SDK Documentation update #773 -->

<!-- SDK Documentation update #782 -->

<!-- SDK Documentation update #784 -->

<!-- SDK Documentation update #788 -->

<!-- SDK Documentation update #789 -->

<!-- SDK Documentation update #792 -->

<!-- SDK Documentation update #797 -->

<!-- SDK Documentation update #800 -->

<!-- SDK Documentation update #803 -->

<!-- SDK Documentation update #805 -->

<!-- SDK Documentation update #807 -->

<!-- SDK Documentation update #812 -->

<!-- SDK Documentation update #813 -->

<!-- SDK Documentation update #815 -->
