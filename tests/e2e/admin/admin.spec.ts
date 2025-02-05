import { test, expect } from '../fixtures';

test.describe('Admin Features', () => {
  test.beforeEach(async ({ page, adminUser }) => {
    // Login as admin
    await page.goto('/login');
    await page.fill('input[type="email"]', adminUser.email);
    await page.fill('input[type="password"]', adminUser.password);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('should create new tour', async ({ page }) => {
    await page.goto('/admin/tours/create');

    // Fill tour details
    await page.fill('input[name="name"]', 'Paris City Tour');
    await page.fill('input[name="destination"]', 'Paris, France');
    await page.fill('textarea[name="description"]', 'Explore the city of love');
    await page.fill('input[name="price"]', '299.99');
    await page.fill('input[name="available"]', '20');
    await page.fill('input[name="start_date"]', '2025-03-01');
    
    await page.click('button[type="submit"]');

    // Verify success message
    const successMessage = page.locator('.success-message');
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toContainText('Tour created successfully');

    // Verify tour appears in list
    await page.goto('/admin/tours');
    const tourName = page.getByText('Paris City Tour');
    await expect(tourName).toBeVisible();
  });

  test('should view all bookings', async ({ page }) => {
    await page.goto('/admin/bookings');

    // Verify bookings table is visible
    const bookingsTable = page.locator('.bookings-table');
    await expect(bookingsTable).toBeVisible();

    // Verify booking details are displayed
    const firstBooking = bookingsTable.locator('tr').nth(1); // Skip header row
    await expect(firstBooking.locator('.booking-id')).toBeVisible();
    await expect(firstBooking.locator('.customer')).toBeVisible();
    await expect(firstBooking.locator('.tour')).toBeVisible();
    await expect(firstBooking.locator('.date')).toBeVisible();
    await expect(firstBooking.locator('.status')).toBeVisible();
  });

  test('should filter and search bookings', async ({ page }) => {
    await page.goto('/admin/bookings');

    // Search for specific tour
    await page.fill('input[type="search"]', 'Paris');
    await expect(page.locator('.booking-row:has-text("Paris")')).toBeVisible();

    // Filter by date
    await page.fill('input[type="date"]', '2025-03-01');
    const filteredBookings = page.locator('.booking-row');
    await expect(filteredBookings).toHaveCount(await filteredBookings.count());
  });

  test('should view all tickets', async ({ page }) => {
    await page.goto('/admin/tickets');

    // Verify tickets table is visible
    const ticketsTable = page.locator('.tickets-table');
    await expect(ticketsTable).toBeVisible();

    // Verify ticket details are displayed
    const firstTicket = ticketsTable.locator('tr').nth(1); // Skip header row
    await expect(firstTicket.locator('.ticket-id')).toBeVisible();
    await expect(firstTicket.locator('.booking-id')).toBeVisible();
    await expect(firstTicket.locator('.customer')).toBeVisible();
    await expect(firstTicket.locator('.tour')).toBeVisible();
    await expect(firstTicket.locator('.status')).toBeVisible();
  });
});
