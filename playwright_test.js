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
        await page.waitForTimeout(600);

        const artifactDir = "C:\\Users\\lutzf\\.gemini\\antigravity\\brain\\9d6eb08b-519b-4cd0-9ff6-845c4de32590";

        // 1. Screenshot Dark Mode Hero & KPIs
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

        // 3. Scroll to Certificates Section and capture screenshot
        const certEl = await page.$('#certificates');
        if (!certEl) throw new Error("Missing #certificates element!");
        await certEl.scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);
        await page.screenshot({ path: path.join(artifactDir, 'portfolio_certificates.png'), clip: { x: 0, y: 0, width: 1280, height: 600 } });
        console.log("Saved portfolio_certificates.png");

        // 4. Scroll to Projects Section and test filter
        const projEl = await page.$('#projects');
        await projEl.scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);

        // Test SAC filter
        await page.click('.filter-btn[data-filter="sac"]');
        await page.waitForTimeout(200);
        const sacCards = await page.$$eval('.project-card', cards => 
            cards.filter(c => window.getComputedStyle(c).display !== 'none').length
        );
        console.log("Visible cards for SAC filter:", sacCards);
        if (sacCards !== 1) throw new Error("Expected 1 card for SAC filter!");

        // Reset filter to all
        await page.click('.filter-btn[data-filter="all"]');
        await page.waitForTimeout(200);

        // Screenshot Projects Section
        await page.screenshot({ path: path.join(artifactDir, 'portfolio_projects.png'), clip: { x: 0, y: 0, width: 1280, height: 850 } });
        console.log("Saved portfolio_projects.png");

        // 5. Open Deep-Dive Modal for SAC project (Card 2)
        await page.click('.project-card:nth-child(2) .detail-btn');
        await page.waitForTimeout(300);
        await page.screenshot({ path: path.join(artifactDir, 'portfolio_modal.png'), clip: { x: 0, y: 0, width: 1280, height: 800 } });
        console.log("Saved portfolio_modal.png");
        await page.keyboard.press('Escape');
        await page.waitForTimeout(200);

        // 6. Scroll to Architecture Section and take screenshot
        const archEl = await page.$('#architecture');
        await archEl.scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);
        await page.screenshot({ path: path.join(artifactDir, 'portfolio_architecture.png'), clip: { x: 0, y: 0, width: 1280, height: 800 } });
        console.log("Saved portfolio_architecture.png");

        // Also save portfolio_preview.png in the project directory
        await page.screenshot({ path: path.join(__dirname, 'portfolio_preview.png'), clip: { x: 0, y: 0, width: 1280, height: 860 } });

        await browser.close();
        console.log("ALL TESTS AND SCREENSHOTS COMPLETED SUCCESSFULLY!");
    } catch (err) {
        console.error("Playwright test error:", err);
        process.exit(1);
    }
})();
