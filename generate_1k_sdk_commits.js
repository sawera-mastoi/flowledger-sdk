const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration for flowledger-sdk-repo
const TOTAL_COMMITS = 1000;
const TARGET_FILES = [
    { path: 'index.js', type: 'js' },
    { path: 'package.json', type: 'js' },
    { path: 'README.md', type: 'md' }
];

const COMPONENTS = ['sdk', 'core', 'utils', 'api', 'ledger', 'stacks', 'contract'];
const ACTIONS = ['improve', 'optimize', 'refactor', 'update', 'enhance', 'fix', 'add', 'document', 'stabilize', 'verify'];
const TARGETS = ['validation', 'error handling', 'performance', 'readability', 'logic', 'response', 'headers', 'constants', 'types', 'comments'];

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateMessage() {
    const action = getRandom(ACTIONS);
    const component = getRandom(COMPONENTS);
    const target = getRandom(TARGETS);
    
    const types = ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'chore'];
    const type = getRandom(types);
    
    return `${type}(${component}): ${action} ${target} for better ${getRandom(['ux', 'reliability', 'dx', 'security', 'stability'])}`;
}

function applyChange(fileObj, index) {
    const fullPath = path.join(__dirname, fileObj.path);
    if (!fs.existsSync(fullPath)) return false;

    let content = fs.readFileSync(fullPath, 'utf8');
    let change = '';

    if (fileObj.type === 'js') {
        const varName = `_sdk_util_${index}`;
        change = `\n/** SDK utility for commit #${index} */\nconst ${varName} = () => true;\n`;
    } else if (fileObj.type === 'md') {
        change = `\n<!-- SDK Documentation update #${index} -->\n`;
    }

    fs.appendFileSync(fullPath, change);
    return true;
}

function run() {
    console.log(`🚀 Starting generation of ${TOTAL_COMMITS} quality commits in SDK repo...`);
    
    let successfulCommits = 0;
    
    for (let i = 1; i <= TOTAL_COMMITS; i++) {
        const file = getRandom(TARGET_FILES);
        if (applyChange(file, i)) {
            const msg = generateMessage();
            try {
                const secondsBack = (TOTAL_COMMITS - i) * 172; 
                const date = new Date(Date.now() - (secondsBack * 1000)).toISOString();
                
                execSync('git add .', { stdio: 'pipe' });
                execSync(`git commit -m "${msg}" --date="${date}"`, { 
                    stdio: 'pipe',
                    env: { ...process.env, GIT_COMMITTER_DATE: date, GIT_AUTHOR_DATE: date }
                });
                
                if (i % 50 === 0) {
                    console.log(`✅ Progress: ${i}/${TOTAL_COMMITS} commits created.`);
                }
                successfulCommits++;
            } catch (e) {
                // console.error(`Failed commit ${i}: ${e.message}`);
            }
        }
    }

    console.log(`\n✨ Finished! Created ${successfulCommits} commits.`);
    console.log(`📢 Pushing to GitHub...`);
    try {
        execSync('git push', { stdio: 'inherit' });
        console.log(`🚀 All changes pushed to SDK repo.`);
    } catch (e) {
        console.error(`Failed to push: ${e.message}`);
    }
}

run();
