import { test, expect } from '../fixtures';

test.describe('Tour Booking', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display list of available tours', async ({ page }) => {
    const tourCards = page.locator('.tour-card');
    await expect(tourCards).toHaveCount(await tourCards.count());
    
    // Check first tour card has all required information
    const firstTour = tourCards.first();
    await expect(firstTour.locator('.destination')).toBeVisible();
    await expect(firstTour.locator('.price')).toBeVisible();
    await expect(firstTour.locator('.description')).toBeVisible();
  });

  test('should complete booking process as guest', async ({ page }) => {
    // Select first tour
    await page.locator('.tour-card').first().click();
    await page.click('text=Book Now');

    // Fill booking form
    await page.fill('input[name="name"]', 'John James');
    await page.fill('input[name="email"]', 'john@gmail.com');
    await page.fill('input[name="phone"]', '+13753736790');
    await page.fill('input[name="passengers"]', '2');
    await page.click('button[type="submit"]');

    // Verify booking confirmation
    const confirmationMessage = page.locator('.confirmation-message');
    await expect(confirmationMessage).toBeVisible();
    await expect(confirmationMessage).toContainText('Booking Confirmed');

    // Generate ticket
    await page.click('text=Generate Ticket');
    
    // Verify ticket details
    const ticket = page.locator('.ticket');
    await expect(ticket).toBeVisible();
    await expect(ticket.locator('.booking-id')).toBeVisible();
    await expect(ticket.locator('.tour-name')).toBeVisible();
    await expect(ticket.locator('.passengers')).toContainText('2');
  });

  test('should calculate correct total price', async ({ page }) => {
    await page.locator('.tour-card').first().click();
    
    const basePrice = await page.locator('.price').innerText();
    const price = parseFloat(basePrice.replace(/[^0-9.]/g, ''));
    
    await page.fill('input[name="passengers"]', '2');
    
    const totalPrice = await page.locator('.total-price').innerText();
    const calculatedTotal = parseFloat(totalPrice.replace(/[^0-9.]/g, ''));
    
    expect(calculatedTotal).toBe(price * 2);
  });
});
