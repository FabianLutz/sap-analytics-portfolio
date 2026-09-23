// Verifikationstest für das Portfolio via Node.js
const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'index.html');
const content = fs.readFileSync(htmlPath, 'utf8');

console.log("Checking index.html size and key components...");

// 1. Check file size
if (content.length < 10000) {
    console.error("FAIL: File seems too short:", content.length);
    process.exit(1);
}

// 2. Check key elements & content
const requiredStrings = [
    'Fabian Lutz',
    'M.Sc. Digital Business & Management',
    'data-theme="dark"',
    'id="certificates"',
    'id="projects"',
    'id="architecture"',
    'id="competencies"',
    'id="quality-promise"',
    'id="validation"',
    'id="roles"',
    'id="deepDiveModal"',
    'id="contact"',
    'filter-btn',
    'pipe-step',
    '@media print',
    'ALCOA+',
    'GAMP 5',
    'GETINGE-GRUPPE',
    'Aesculap AG',
    'Maquet Cardiopulmonary',
    'sehr präzise, gewissenhafte und effiziente Arbeitsweise',
    'genaue Analysefähigkeit und eine enorme Auffassungsgabe',
    'IT Data Analyst / BI Specialist',
    'SAP &amp; Enterprise Business Analyst',
    'Data Governance &amp; Compliance Analyst',
    'Verfügbar für den Einstieg in die SAP-Analytics-Positionen ab sofort'
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

// 3. Check section order matches user's 7-step sequence
console.log("\nChecking sequence of sections...");
const sectionOrder = [
    'id="certificates"',
    'id="projects"',
    'id="architecture"',
    'id="competencies"',
    'id="validation"',
    'id="roles"',
    'id="contact"'
];

let lastIndex = -1;
for (const sec of sectionOrder) {
    const idx = content.indexOf(sec);
    if (idx === -1) {
        console.error(`FAIL: Section '${sec}' not found in DOM!`);
        allPassed = false;
    } else if (idx < lastIndex) {
        console.error(`FAIL: Section '${sec}' is out of order! Found at ${idx}, previous was at ${lastIndex}`);
        allPassed = false;
    } else {
        console.log(`PASS: Ordered correctly: ${sec} (index ${idx})`);
        lastIndex = idx;
    }
}

// 4. Ensure NO weakness/gap/risk analysis appears in public content
console.log("\nChecking that no weakness/gap analysis terms are in the portfolio...");
const forbiddenTerms = [
    'Lücken- und Risikoanalyse',
    'Ehrliche Lücken',
    'Was man nicht behaupten darf',
    'Schwachstellen'
];

for (const term of forbiddenTerms) {
    if (content.toLowerCase().includes(term.toLowerCase())) {
        console.error(`FAIL: Found forbidden term in portfolio: '${term}'`);
        allPassed = false;
    } else {
        console.log(`PASS: Confirmed absence of: '${term}'`);
    }
}

if (!allPassed) {
    console.error("\nTEST FAILED!");
    process.exit(1);
}

console.log("\nALL STATIC VERIFICATIONS & SEQUENCE CHECKS PASSED!");
