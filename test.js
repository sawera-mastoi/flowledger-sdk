/**
 * @earnwithalee/stacks-echo-kit
 * Basic Sanity Tests
 */

const kit = require("./index");
const assert = require("assert");

console.log("🚀 Starting Stacks Echo Kit Tests...");

try {
  // Test STX Conversion
  console.log("- Testing STX conversion...");
  assert.strictEqual(kit.microToStx(1000000), 1, "1,000,000 microSTX should be 1 STX");
  assert.strictEqual(kit.stxToMicro(1), 1000000, "1 STX should be 1,000,000 microSTX");

  // Test Address Validation
  console.log("- Testing address validation...");
  assert.strictEqual(kit.isValidAddress("SP000000000000000000002Q6VF78"), true, "Standard mainnet address should be valid");
  assert.strictEqual(kit.isValidAddress("InvalidAddress"), false, "Garbage string should be invalid");

  // Test x402 Helpers
  console.log("- Testing x402 helpers...");
  const payload = { test: "data" };
  const encoded = kit.encodeX402Payload(payload);
  const decoded = kit.decodeX402Header(encoded);
  assert.deepStrictEqual(decoded, payload, "x402 decode should match encode");

  console.log("\n✅ ALL TESTS PASSED SUCCESSFULLY!");
} catch (error) {
  console.error("\n❌ TEST FAILED:");
  console.error(error.message);
  process.exit(1);
}
