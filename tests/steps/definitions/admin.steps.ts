import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page } from './world';

Given('I am logged in as an admin', async function () {
    await page.goto('http://localhost:8000/login');
    await page.fill('input[type="email"]', 'admin@account.com');
    await page.fill('input[type="password"]', 'password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard');
});

When('I navigate to {string} page', async function (pageName: string) {
    // Convert page name to URL
    const pageUrls: { [key: string]: string } = {
        'Create Tour': '/admin/tours/create',
        'All Bookings': '/admin/bookings',
        'All Tickets': '/admin/tickets'
    };
    await page.goto(`http://localhost:8000${pageUrls[pageName]}`);
});

When('I fill in the tour details:', async function (dataTable) {
    const formData = dataTable.rowsHash();
    for (const [field, value] of Object.entries(formData)) {
        const fieldName = field.toLowerCase().replace(' ', '_');
        if (field === 'Description') {
            await page.fill(`textarea[name="${fieldName}"]`, value);
        } else {
            await page.fill(`input[name="${fieldName}"]`, value);
        }
    }
});

Then('I should see a success message', async function () {
    const successMessage = await page.locator('.success-message').isVisible();
    expect(successMessage).toBeTruthy();
});

Then('the new tour should appear in the tours list', async function () {
    await page.goto('http://localhost:8000/admin/tours');
    const tourName = await page.getByText('Paris City Tour').isVisible();
    expect(tourName).toBeTruthy();
});

Then('I should see a list of all bookings', async function () {
    const bookingsList = await page.locator('.bookings-table').isVisible();
    expect(bookingsList).toBeTruthy();
});

Then('each booking should display:', async function (dataTable) {
    const fields = dataTable.raw().map(row => row[0]);
    const firstBooking = await page.locator('.booking-row').first();
    for (const field of fields) {
        const fieldElement = await firstBooking.locator(`.${field.toLowerCase().replace(' ', '-')}`);
        expect(await fieldElement.isVisible()).toBeTruthy();
    }
});

Then('I should see a list of all generated tickets', async function () {
    const ticketsList = await page.locator('.tickets-table').isVisible();
    expect(ticketsList).toBeTruthy();
});

When('I search for {string}', async function (searchTerm: string) {
    await page.fill('input[type="search"]', searchTerm);
});

When('I filter by date {string}', async function (date: string) {
    await page.fill('input[type="date"]', date);
});

Then('I should see bookings related to {string} tours', async function (searchTerm: string) {
    const results = await page.locator(`.booking-row:has-text("${searchTerm}")`).count();
    expect(results).toBeGreaterThan(0);
});

Then('I should see bookings for that date', async function () {
    const results = await page.locator('.booking-row').count();
    expect(results).toBeGreaterThan(0);
});
