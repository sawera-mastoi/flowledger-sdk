/**
 * @earnwithalee/stacks-echo-kit
 * JIT Lending Utilities
 */

const { LENDING_CONTRACTS } = require("./constants");

/**
 * Build the post-conditions required for a borrow-and-pay transaction.
 * @param {string} sender - The agent's address.
 * @param {string} vault - The vault contract address.
 * @param {bigint} collateralSbtc - Amount of sBTC to lock.
 * @param {bigint} netPaymentUsdcx - Amount of USDCx to pay.
 */
function buildLendingPostConditions(sender, vault, collateralSbtc, netPaymentUsdcx) {
  // This is a helper that users can pass to @stacks/transactions
  return {
    collateral: {
      address: sender,
      amount: collateralSbtc,
      asset: "sbtc-token"
    },
    payment: {
      address: vault,
      amount: netPaymentUsdcx,
      asset: "usdcx-token"
    }
  };
}

module.exports = {
  buildLendingPostConditions,
};
