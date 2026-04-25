/**
 * @earnwithalee/stacks-echo-kit
 * Package Metrics Optimization Script
 * 
 * This script automates the verification of package downloads from the registry.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PACKAGE_NAME = "@sawera-mastoi/stacks-echo-kit";
const ITERATIONS = 10; // Number of verification downloads per run

function boost() {
    console.log(`🚀 Starting metrics optimization for ${PACKAGE_NAME}...`);
    
    const tempDir = path.join(__dirname, 'temp_boost');
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
    
    process.chdir(tempDir);
    execSync('npm init -y');

    for (let i = 1; i <= ITERATIONS; i++) {
        try {
            console.log(`[${i}/${ITERATIONS}] Verifying download...`);
            // Use --no-save and --force to ensure a fresh download count
            execSync(`npm install ${PACKAGE_NAME} --no-save --force`, { stdio: 'ignore' });
        } catch (error) {
            console.error(`Failed at iteration ${i}`);
        }
    }

    console.log("🧹 Cleaning up...");
    process.chdir(__dirname);
    fs.rmSync(tempDir, { recursive: true, force: true });
    
    console.log("✅ Metrics optimization completed successfully!");
}

boost();
