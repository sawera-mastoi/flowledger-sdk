// =============================================================================
// FlowLedger SDK — x402_utils.js
// x402 V2 protocol helpers required by the payment interceptor.
// =============================================================================

const {
  decodePaymentRequired,
  decodePaymentResponse,
  encodePaymentPayload,
  X402_HEADERS,
} = require("x402-stacks");
const { normalizeTxid } = require("./network_utils");

const PAYMENT_REQUIRED_HEADER = X402_HEADERS.PAYMENT_REQUIRED;
const PAYMENT_SIGNATURE_HEADER = X402_HEADERS.PAYMENT_SIGNATURE;
const PAYMENT_RESPONSE_HEADER = X402_HEADERS.PAYMENT_RESPONSE;

/**
 * Parses the payment-required header.
 */
function parsePaymentRequiredHeader(encoded) {
  const decoded = decodePaymentRequired(encoded);

  if (!decoded || decoded.x402Version !== 2 || !Array.isArray(decoded.accepts)) {
    throw new Error("Malformed payment-required header");
  }

  return decoded;
}

/**
 * Builds the base64-encoded value of the payment-signature request header.
 */
function buildPaymentSignatureHeader(opts) {
  const header = {
    x402Version: 2,
    resource: opts.resource,
    accepted: opts.accepted,
    payload: {
      transaction: opts.signedTransactionHex,
    },
    ...(opts.paymentIdentifier && {
      extensions: { "payment-identifier": opts.paymentIdentifier },
    }),
  };

  return encodePaymentPayload(header);
}

/**
 * Decodes the payment-response header.
 */
function parsePaymentResponseHeader(encoded) {
  const decoded = decodePaymentResponse(encoded);

  if (!decoded || !decoded.transaction) {
    throw new Error("Malformed payment-response header");
  }

  return {
    ...decoded,
    transaction: normalizeTxid(decoded.transaction),
  };
}

module.exports = {
  PAYMENT_REQUIRED_HEADER,
  PAYMENT_SIGNATURE_HEADER,
  PAYMENT_RESPONSE_HEADER,
  parsePaymentRequiredHeader,
  buildPaymentSignatureHeader,
  parsePaymentResponseHeader,
};
