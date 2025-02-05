import { test, expect } from '../fixtures';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.fill('input[type="email"]', 'invalid@gmail.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    const errorMessage = await page.locator('.error-message');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Invalid credentials');
  });

  test('should login successfully with valid credentials', async ({ page, adminUser }) => {
    await page.fill('input[type="email"]', adminUser.email);
    await page.fill('input[type="password"]', adminUser.password);
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('should redirect to intended page after login', async ({ page, adminUser }) => {
    // Try to access protected route
    await page.goto('/admin/tours');
    // Should be redirected to login
    await expect(page).toHaveURL(/.*login/);
    
    // Login
    await page.fill('input[type="email"]', adminUser.email);
    await page.fill('input[type="password"]', adminUser.password);
    await page.click('button[type="submit"]');

    // Should be redirected back to intended URL
    await expect(page).toHaveURL(/.*admin\/tours/);
  });
});
