// Verifikationstest für das Portfolio via Node.js
const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'index.html');
const content = fs.readFileSync(htmlPath, 'utf8');

console.log("Checking index.html size and key components...");

// Check file exists and has size
if (content.length < 5000) {
    console.error("FAIL: File seems too short:", content.length);
    process.exit(1);
}

// Check key elements
const requiredStrings = [
    'Fabian Lutz',
    'M.Sc. Digital Business & Management',
    'data-theme="dark"',
    'themeToggle',
    'id="architecture"',
    'id="projects"',
    'id="competencies"',
    'id="deepDiveModal"',
    'filter-btn',
    'pipe-step',
    '@media print'
];

let allPassed = true;
for (const req of requiredStrings) {
    if (!content.includes(req)) {
        console.error(`FAIL: Missing expected content '${req}'`);
        allPassed = false;
    } else {
        console.log(`PASS: Found '${req}'`);
    }
}

if (!allPassed) {
    process.exit(1);
}

console.log("ALL STATIC VERIFICATIONS PASSED!");
