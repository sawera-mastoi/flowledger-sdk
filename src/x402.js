/**
 * @earnwithalee/stacks-echo-kit
 * x402 Protocol Helpers (Zero-Dependency)
 */

const X402_HEADERS = {
  PAYMENT_REQUIRED: "payment-required",
  PAYMENT_SIGNATURE: "payment-signature",
  PAYMENT_RESPONSE: "payment-response",
};

/**
 * Encodes a JSON payload to Base64 for x402 headers.
 */
function encodeX402Payload(payload) {
  try {
    const json = JSON.stringify(payload);
    return Buffer.from(json).toString("base64");
  } catch (e) {
    return "";
  }
}

/**
 * Decodes a Base64 x402 header back to JSON.
 */
function decodeX402Header(encoded) {
  try {
    const json = Buffer.from(encoded, "base64").toString("utf8");
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

module.exports = {
  X402_HEADERS,
  encodeX402Payload,
  decodeX402Header,
};
