import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page } from './world';

Given('I am on the home page', async function () {
    await page.goto('http://localhost:8000');
});

Then('I should see a list of available tours', async function () {
    const tours = await page.locator('.tour-card').count();
    expect(tours).toBeGreaterThan(0);
});

Then('each tour should display destination, price, and description', async function () {
    const firstTour = await page.locator('.tour-card').first();
    expect(await firstTour.locator('.destination').isVisible()).toBeTruthy();
    expect(await firstTour.locator('.price').isVisible()).toBeTruthy();
    expect(await firstTour.locator('.description').isVisible()).toBeTruthy();
});

When('I select a tour from the list', async function () {
    await page.locator('.tour-card').first().click();
});

When('I click on {string}', async function (buttonText: string) {
    await page.getByText(buttonText).click();
});

When('I fill in the booking form with:', async function (dataTable) {
    const formData = dataTable.rowsHash();
    for (const [field, value] of Object.entries(formData)) {
        await page.fill(`input[name="${field.toLowerCase()}"]`, value);
    }
});

When('I submit the booking form', async function () {
    await page.click('button[type="submit"]');
});

Then('I should see a booking confirmation message', async function () {
    const confirmationMessage = await page.locator('.confirmation-message').isVisible();
    expect(confirmationMessage).toBeTruthy();
});

Given('I have completed a tour booking', async function () {
    // This step assumes we're on the booking confirmation page
    const confirmationMessage = await page.locator('.confirmation-message').isVisible();
    expect(confirmationMessage).toBeTruthy();
});

Then('I should see my ticket with booking details', async function () {
    const ticket = await page.locator('.ticket').isVisible();
    expect(ticket).toBeTruthy();
});

Then('the ticket should include:', async function (dataTable) {
    const fields = dataTable.raw().map(row => row[0]);
    for (const field of fields) {
        const fieldElement = await page.locator(`.ticket .${field.toLowerCase().replace(' ', '-')}`);
        expect(await fieldElement.isVisible()).toBeTruthy();
    }
});
