// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from './Pages/LogInPage';

test('Login', async ({ page }) => {
  await page.goto('https://stg-fe.tamatemplus.com/home', { waitUntil: 'domcontentloaded' });
  await page.locator('#close > svg').click();
  await page.pause()
  await page.locator('[data-test-id="signup_button"]').click();
  await page.getByText('البريد الإلكتروني أو رقم الهاتف المحمول').click();
  await page.locator('[data-test-id="email"]').click();
  await page.locator('[data-test-id="email"]').fill('muath20foudeh@gmail.com');
  await page.locator('[data-test-id="password"]').click();
  await page.locator('[data-test-id="password"]').press('CapsLock');
  await page.locator('[data-test-id="password"]').fill('P');
  await page.locator('[data-test-id="password"]').press('CapsLock');
  await page.locator('[data-test-id="password"]').fill('Password1!');
 // 1. Target the specific reCAPTCHA anchor iframe using src or first()
const recaptchaFrame = page.frameLocator('iframe[src*="recaptcha/api2/anchor"]');

// 2. Click the checkbox inside the anchor frame
await recaptchaFrame.getByRole('checkbox', { name: /أنا لست برنامج روبوت|I'm not a robot/ }).click();
  await page.locator('[data-test-id="submitForm_signin_by_email"]').click();
  await page.locator('#close').click();
  await page.getByText('M', { exact: true }).click();
  await page.locator('[data-test-id="user_menu_my_profile_button"]').click();
// 1. Verify User ID (الرقم التعريفي)
  const userIdLocator = page.locator('app-profile').getByText('PL26000087');
  await expect(userIdLocator).toBeVisible();
  await expect(userIdLocator).toHaveText('PL26000087');

  // 2. Verify Full Name (الاسم الكامل)
  const fullNameInput = page.getByRole('textbox', { name: 'الاسم الكامل' });
  await expect(fullNameInput).toBeVisible();
  await expect(fullNameInput).toHaveValue('moad foudeh');

  // 3. Verify Email Address (البريد الإلكتروني)
  const emailInput = page.getByRole('textbox', { name: 'البريد الإلكتروني' });
  await expect(emailInput).toBeVisible();
  await expect(emailInput).toHaveValue('muath20foudeh@gmail.com');
  
});
