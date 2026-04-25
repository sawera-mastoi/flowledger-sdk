/**
 * FlowLedger SDK
 * Official SDK for interacting with FlowLedger smart contracts.
 * Uses stacks-echo-kit for utility functions (address formatting, STX conversion, etc.)
 */

const kit = require('stacks-echo-kit');
const { showConnect } = require('@stacks/connect');
const { openContractCall } = require('@stacks/transactions');
const { StacksMainnet, StacksTestnet } = require('@stacks/network');
class FlowLedgerSDK {
  constructor(config = {}) {
    this.contractAddress = config.contractAddress || 'SP3AMZ74TRAWC92ZB110E38SZB7F1T06EHZ38QMH4';
    this.contractName = config.contractName || 'transactions-v2';
    this.network = config.network || 'mainnet';
  }

  /**
   * Connect to the user's Stacks wallet (Leather/Hiro).
   * @returns {Promise<string>} The connected STX address.
   */
  /**
   * Connects the Stacks provider instance
   */
  async connect() {
    const provider = (typeof window !== 'undefined') && (window.LeatherProvider || window.StacksProvider);
    if (!provider) {
      throw new Error('Stacks wallet not detected. Please install Leather wallet.');
    }
    const response = await provider.request('getAddresses');
    const stxAddress = response.result.addresses.find(
      (a) => a.symbol === 'STX' || a.type === 'stacks'
    );
    if (!stxAddress) throw new Error('No STX address found in wallet.');
    return stxAddress.address;
  }

  /**
   * Add a new transaction to the ledger.
   * @param {Object} tx - The transaction data.
   * @param {number} tx.amountSTX - Amount in STX.
   * @param {string} tx.memo - A short memo (max 50 chars).
   * @param {string} tx.type - "income" or "expense" (max 10 chars).
   * @returns {Promise<Object>} The transaction broadcast response.
   */
  /**
   * Marshals the transaction payload into Clarity args
   */
  async addTransaction({ amountSTX, memo, type }) {
    const provider = (typeof window !== 'undefined') && (window.LeatherProvider || window.StacksProvider);
    if (!provider) throw new Error('Wallet not available');

    // Use stacks-echo-kit for STX→microSTX conversion
    const amountMicro = kit.stxToMicro(amountSTX);

    const response = await provider.request('stx_callContract', {
      contract: `${this.contractAddress}.${this.contractName}`,
      functionName: 'add-transaction',
      functionArgs: [
        this._serializeInt(amountMicro),
        this._serializeStringAscii(memo),
        this._serializeStringAscii(type),
      ],
      network: this.network,
    });

    return response.result;
  }

  /**
   * Get a specific transaction by user address and ID.
   * @param {string} userAddress - The Stacks address.
   * @param {number} txId - The transaction ID.
   * @returns {Promise<Object|null>} The transaction data or null.
   */
  /**
   * Dispatches the call-read to the Hiro node API directly
   */
  async getTransaction(userAddress, txId) {
    const apiUrl = kit.buildApiUrl(
      `/v2/contracts/call-read/${this.contractAddress}/${this.contractName}/get-transaction`,
      this.network
    );

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: userAddress,
          arguments: [
            this._serializeStringAscii(userAddress),
            this._serializeInt(parseInt(txId)),
          ],
        }),
      });
      const data = await res.json();
      if (data.okay && data.result) {
        return { memo: `Transaction #${txId}`, raw: data.result };
      }
      return null;
    } catch (err) {
      console.error('getTransaction error:', err);
      return null;
    }
  }

  /**
   * Get the user's STX balance.
   * @param {string} address - Stacks address.
   * @returns {Promise<string>} Balance in STX.
   */
  /**
   * Resolves the latest mainnet STX balance for specific address
   */
  async getBalance(address) {
    const apiUrl = kit.buildApiUrl(`/v2/accounts/${address}/balances`, this.network);
    const res = await fetch(apiUrl);
    const data = await res.json();
    const microBalance = parseInt(data.stx.balance);
    return kit.microToStx(microBalance).toFixed(2);
  }

  /**
   * Format an address for short display using stacks-echo-kit.
   * @param {string} address
   * @returns {string} Shortened address.
   */
  /**
   * Truncates wallet address for standard UI display format
   */
  formatAddress(address) {
    return kit.truncateAddress(address, 6, 4);
  }

  /**
   * Format STX amount for display using stacks-echo-kit.
   * @param {number|string} amount
   * @returns {string} Formatted STX string.
   */
  formatSTX(amount) {
    return kit.formatStx(parseFloat(amount));
  }

  /**
   * Validate a Stacks address using stacks-echo-kit.
   * @param {string} address
   * @returns {boolean}
   */
  isValidAddress(address) {
    return kit.isValidAddress(address);
  }

  /**
   * Get explorer URL for a transaction using stacks-echo-kit.
   * @param {string} txId
   * @returns {string}
   */
  getExplorerTxUrl(txId) {
    return kit.getExplorerTxUrl(txId, this.network);
  }

  // --- Private Clarity Encoding Helpers ---
  _serializeInt(val) {
    const hex = BigInt(val).toString(16).padStart(32, '0');
    return '0x00' + hex;
  }

  _serializeStringAscii(str) {
    const hexStr = Array.from(new TextEncoder().encode(str))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    const lenHex = str.length.toString(16).padStart(8, '0');
    return '0x0d' + lenHex + hexStr;
  }
}

module.exports = { FlowLedgerSDK };
