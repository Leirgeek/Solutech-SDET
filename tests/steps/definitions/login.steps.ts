import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page } from './world';

Given('I am on the login page', async function () {
    await page.goto('http://localhost:8000/login');
});

When('I enter invalid email {string}', async function (email: string) {
    await page.fill('input[type="email"]', email);
});

When('I enter invalid password {string}', async function (password: string) {
    await page.fill('input[type="password"]', password);
});

When('I enter valid email {string}', async function (email: string) {
    await page.fill('input[type="email"]', email);
});

When('I enter valid password {string}', async function (password: string) {
    await page.fill('input[type="password"]', password);
});

When('I click the login button', async function () {
    await page.click('button[type="submit"]');
});

Then('I should see an error message', async function () {
    const errorMessage = await page.locator('.error-message').isVisible();
    expect(errorMessage).toBeTruthy();
});

Then('I should be redirected to the dashboard', async function () {
    await page.waitForURL('**/dashboard');
    const currentUrl = page.url();
    expect(currentUrl).toContain('/dashboard');
});
