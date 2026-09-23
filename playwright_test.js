const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
    try {
        console.log("Launching Microsoft Edge / Chrome via Playwright...");
        const browser = await chromium.launch({ headless: true, channel: 'msedge' });
        const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
        
        const fileUrl = 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');
        console.log("Navigating to:", fileUrl);
        await page.goto(fileUrl);
        await page.waitForTimeout(500);

        const artifactDir = "C:\\Users\\lutzf\\.gemini\\antigravity\\brain\\9d6eb08b-519b-4cd0-9ff6-845c4de32590";

        // 1. Screenshot Dark Mode Hero
        await page.screenshot({ path: path.join(artifactDir, 'portfolio_dark_hero.png'), clip: { x: 0, y: 0, width: 1280, height: 860 } });
        console.log("Saved portfolio_dark_hero.png");

        // 2. Toggle to Light Mode and take screenshot
        await page.click('#themeToggle');
        await page.waitForTimeout(300);
        await page.screenshot({ path: path.join(artifactDir, 'portfolio_light_hero.png'), clip: { x: 0, y: 0, width: 1280, height: 860 } });
        console.log("Saved portfolio_light_hero.png");

        // Switch back to Dark Mode
        await page.click('#themeToggle');
        await page.waitForTimeout(300);

        // 3. Scroll to Architecture Section and take screenshot
        const archEl = await page.$('#architecture');
        await archEl.scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);
        await page.screenshot({ path: path.join(artifactDir, 'portfolio_architecture.png'), clip: { x: 0, y: 0, width: 1280, height: 800 } });
        console.log("Saved portfolio_architecture.png");

        // 4. Click Step 3 in pipeline
        await page.click('.pipe-step[data-step="3"]');
        await page.waitForTimeout(200);

        // 5. Scroll to Projects and open Deep-Dive Modal
        const projEl = await page.$('#projects');
        await projEl.scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);
        await page.click('.project-card:first-child .detail-btn');
        await page.waitForTimeout(300);
        await page.screenshot({ path: path.join(artifactDir, 'portfolio_modal.png'), clip: { x: 0, y: 0, width: 1280, height: 800 } });
        console.log("Saved portfolio_modal.png");

        await browser.close();
        console.log("ALL DETAILED SCREENSHOTS CAPTURED SUCCESSFULLY!");
    } catch (err) {
        console.error("Playwright test error:", err);
        process.exit(1);
    }
})();
