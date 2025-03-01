import { Before, After } from '@cucumber/cucumber';
import { chromium, Page, Browser } from '@playwright/test';

let browser: Browser;
export let page: Page;

Before(async () => {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    page = await context.newPage();
});

After(async () => {
    await browser.close();
});
