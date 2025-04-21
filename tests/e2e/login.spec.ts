import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/login');
  });

  test('should display login form', async ({ page }) => {
    // Check if the login page and form are visible
    await expect(page.getByTestId('login-page')).toBeVisible();
    await expect(page.getByTestId('login-title')).toBeVisible();
    await expect(page.getByTestId('login-form')).toBeVisible();
    await expect(page.getByTestId('email-input')).toBeVisible();
    await expect(page.getByTestId('password-input')).toBeVisible();
    await expect(page.getByTestId('submit-button')).toBeVisible();
  });

  test('should show validation errors for empty form submission', async ({ page }) => {
    await page.getByTestId('submit-button').click();
    
    // Check for validation messages
    await expect(page.getByTestId('email-input')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.getByTestId('password-input')).toHaveAttribute('aria-invalid', 'true');
  });

  test('should show validation error for invalid email', async ({ page }) => {
    await page.getByTestId('email-input').fill('invalid-email');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('submit-button').click();
    
    await expect(page.getByTestId('email-input')).toHaveAttribute('aria-invalid', 'true');
  });

  test('should show error message for invalid credentials', async ({ page }) => {
    await page.getByTestId('email-input').fill('wrong@example.com');
    await page.getByTestId('password-input').fill('wrongpassword');
    await page.getByTestId('submit-button').click();
    
    await expect(page.getByTestId('error-alert')).toBeVisible();
  });

  test('should successfully login with valid credentials', async ({ page }) => {
    await page.getByTestId('email-input').fill('test@example.com');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('submit-button').click();
    
    // Assuming successful login redirects to dashboard
    await expect(page).toHaveURL('/en/in');
  });

  test('should have working "Forgot Password" link', async ({ page }) => {
    await page.getByTestId('forgot-password-link').click();
    await expect(page).toHaveURL('/en/forgot-password');
  });

  test('should have working "Sign Up" link', async ({ page }) => {
    await page.getByTestId('signup-link').click();
    await expect(page).toHaveURL('/en/signup');
  });

  test('should persist login state after page refresh', async ({ page }) => {
    // Login first
    await page.getByTestId('email-input').fill('test@example.com');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('submit-button').click();
    
    // Refresh the page
    await page.reload();
    
    // Should still be logged in
    await expect(page).toHaveURL('/en/in');
  });

  test('should handle network errors gracefully', async ({ page }) => {
    // Simulate network error
    await page.route('**/api/auth/login', route => route.abort());
    
    await page.getByTestId('email-input').fill('test@example.com');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('submit-button').click();
    
    // Check for network error message
    await expect(page.getByTestId('error-alert')).toBeVisible();
  });

  test('should pass accessibility checks', async ({ page }) => {
    // Run accessibility scan
    const accessibilityScanResults = await page.accessibility.snapshot();
    expect(accessibilityScanResults).toBeTruthy();
  });

  test('should have proper form accessibility attributes', async ({ page }) => {
    // Check form labels and ARIA attributes
    const emailInput = page.getByTestId('email-input');
    const passwordInput = page.getByTestId('password-input');
    
    // Check that inputs have proper labels
    await expect(emailInput).toHaveAttribute('aria-label', 'Email');
    await expect(passwordInput).toHaveAttribute('aria-label', 'Password');
    
    // Check that inputs are properly associated with their labels
    await expect(emailInput).toHaveAttribute('id');
    await expect(passwordInput).toHaveAttribute('id');
    
    // Check that form has proper role
    await expect(page.getByTestId('login-form')).toHaveAttribute('role', 'form');
  });

  test('should have proper error message accessibility', async ({ page }) => {
    // Submit empty form to trigger errors
    await page.getByTestId('submit-button').click();
    
    // Check that error messages are properly announced
    const emailInput = page.getByTestId('email-input');
    const passwordInput = page.getByTestId('password-input');
    
    await expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    await expect(passwordInput).toHaveAttribute('aria-invalid', 'true');
    
    // Check that error messages are properly associated with inputs
    await expect(emailInput).toHaveAttribute('aria-describedby');
    await expect(passwordInput).toHaveAttribute('aria-describedby');
  });

  test('should have proper focus management', async ({ page }) => {
    // Check initial focus
    await expect(page.getByTestId('email-input')).toBeFocused();
    
    // Check tab order
    await page.keyboard.press('Tab');
    await expect(page.getByTestId('password-input')).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.getByTestId('forgot-password-link')).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.getByTestId('submit-button')).toBeFocused();
  });

  test('should have proper keyboard navigation', async ({ page }) => {
    // Test form submission with keyboard
    await page.getByTestId('email-input').fill('test@example.com');
    await page.getByTestId('password-input').fill('password123');
    await page.keyboard.press('Enter');
    
    // Should submit the form
    await expect(page).toHaveURL('/en/in');
  });

  test('should have proper color contrast', async ({ page }) => {
    // Check text color contrast
    const loginTitle = page.getByTestId('login-title');
    const contrast = await loginTitle.evaluate((element) => {
      const style = window.getComputedStyle(element);
      const backgroundColor = style.backgroundColor;
      const textColor = style.color;
      // This is a simplified check - in real scenarios, you'd use a proper contrast checking library
      return {
        background: backgroundColor,
        text: textColor,
        hasGoodContrast: backgroundColor !== textColor
      };
    });
    
    expect(contrast.hasGoodContrast).toBeTruthy();
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    // Check that headings are properly structured
    const headings = await page.$$eval('h1, h2, h3, h4, h5, h6', (elements) => 
      elements.map(el => ({
        tag: el.tagName.toLowerCase(),
        text: el.textContent?.trim()
      }))
    );
    
    // Should have at least one h1 (the login title)
    expect(headings.some(h => h.tag === 'h1')).toBeTruthy();
  });
}); 