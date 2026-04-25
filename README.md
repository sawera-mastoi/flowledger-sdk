# @earnwithalee/flowledger-sdk

[![npm version](https://img.shields.io/npm/v/@earnwithalee/flowledger-sdk.svg)](https://www.npmjs.com/package/@earnwithalee/flowledger-sdk)
[![npm downloads](https://img.shields.io/npm/dm/@earnwithalee/flowledger-sdk.svg)](https://www.npmjs.com/package/@earnwithalee/flowledger-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The official SDK for interacting with **FlowLedger** smart contracts on the [Stacks blockchain](https://www.stacks.co/) (Bitcoin L2).

FlowLedger is a daily transaction tracker that allows users to log income and expenses, view real-time spending analytics, and store transaction records on-chain using Clarity smart contracts.

## Features

- 🔐 **Wallet Integration** — Simplified connection to Stacks wallets (Leather/Hiro)
- 📜 **Contract Wrapper** — Easy-to-use methods for the FlowLedger `transactions-v2` contract
- ⚡ **Auto-Encoding** — Automatic Clarity value encoding for contract calls
- 📊 **Read-Only API** — Quick access to transaction status and ledger history
- 🛠️ **Utility Functions** — Address formatting, STX conversion, validation via `stacks-echo-kit`

## Installation

```bash
npm install @earnwithalee/flowledger-sdk stacks-echo-kit
```

## Quick Start

```javascript
const { FlowLedgerSDK } = require('@earnwithalee/flowledger-sdk');

const sdk = new FlowLedgerSDK({
  network: 'mainnet' // or 'testnet'
});

// 1. Connect Wallet
const address = await sdk.connect();
console.log(`Connected: ${sdk.formatAddress(address)}`);

// 2. Add Transaction
const response = await sdk.addTransaction({
  amountSTX: 10,
  memo: "Talent Protocol reward",
  type: "income"
});
console.log('Transaction Broadcasted:', response.txId);

// 3. Get User Balance (via Hiro API)
const balance = await sdk.getBalance(address);
console.log(`Balance: ${sdk.formatSTX(balance)}`);

// 4. Get Transaction Details
const tx = await sdk.getTransaction(address, 1);
console.log('Transaction:', tx);
```

## API Reference

### `new FlowLedgerSDK(config)`

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `config.network` | `string` | `'mainnet'` | `'mainnet'` or `'testnet'` |
| `config.contractAddress` | `string` | `SP3AMZ74T...` | Stacks address of the deployed contract |
| `config.contractName` | `string` | `'transactions-v2'` | Name of the Clarity contract |

### Core Methods

#### `sdk.connect()`
Prompts the user to connect their Stacks wallet (Leather/Hiro). Returns the connected STX address.

#### `sdk.addTransaction({ amountSTX, memo, type })`
Calls the `add-transaction` public function on the smart contract.
- `amountSTX` — Amount in STX (auto-converted to microSTX)
- `memo` — Short memo string (max 50 chars)
- `type` — `"income"` or `"expense"` (max 10 chars)

#### `sdk.getTransaction(userAddress, txId)`
Retrieves a specific transaction from the ledger via the Hiro API.

#### `sdk.getBalance(address)`
Gets the STX balance of a given Stacks address.

### Utility Methods

#### `sdk.formatAddress(address)`
Truncates a wallet address for UI display (e.g., `SP3AM...8QMH4`).

#### `sdk.formatSTX(amount)`
Formats a numeric STX amount for display.

#### `sdk.isValidAddress(address)`
Validates a Stacks address format.

#### `sdk.getExplorerTxUrl(txId)`
Returns the Stacks Explorer URL for a given transaction ID.

## Utility Module

Additional utility functions are available via the `utils.js` module:

```javascript
const { truncateAddress, formatMicroToStx, isValidAddress } = require('@earnwithalee/flowledger-sdk/utils');

truncateAddress('SP3AMZ74TRAWC92ZB110E38SZB7F1T06EHZ38QMH4');
// => "SP3AM...8QMH4"

formatMicroToStx(10000000);
// => "10.00 STX"

isValidAddress('SP3AMZ74TRAWC92ZB110E38SZB7F1T06EHZ38QMH4');
// => true
```

## Related Projects

- [FlowLedger DApp](https://github.com/sawera-mastoi/FlowLedger) — The main FlowLedger application
- [stacks-echo-kit](https://www.npmjs.com/package/stacks-echo-kit) — Lightweight Stacks utility toolkit

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [earnwithalee](https://github.com/sawera-mastoi)
