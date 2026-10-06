import { test, expect } from '@playwright/test';
import { LoginPage } from './Pages/LogInPage';

test('Sign Up', async ({ page }) => {
  await page.goto('https://stg-fe.tamatemplus.com/home', { waitUntil: 'domcontentloaded' });
  await page.locator('#close > svg').click();
  await page.pause()
  await page.locator('[data-test-id="signup_button"]').click();
  await page.getByRole('link', { name: 'إنشاء حساب' }).click();
  await page.locator('[data-test-id="signup_email_redirect"]').click();
  await page.getByText('البريد الإلكتروني').click();
  await page.locator('[data-test-id="email"]').click();
  await page.locator('[data-test-id="email"]').fill('muath20foudeh@gmail.com');
  await page.locator('[data-test-id="password"]').click();
  await page.locator('[data-test-id="password"]').press('CapsLock');
  await page.locator('[data-test-id="password"]').fill('P');
  await page.locator('[data-test-id="password"]').press('CapsLock');
  await page.locator('[data-test-id="password"]').fill('Password1!');
  await page.locator('[data-test-id="full_name"]').click();
  await page.locator('[data-test-id="full_name"]').fill('moad foudeh');
  // 1. Target the specific reCAPTCHA anchor iframe using src or first()
const recaptchaFrame = page.frameLocator('iframe[src*="recaptcha/api2/anchor"]');

// 2. Click the checkbox inside the anchor frame
await recaptchaFrame.getByRole('checkbox', { name: /أنا لست برنامج روبوت|I'm not a robot/ }).click();
  await page.locator('[data-test-id="signup_email_submitForm"]').click();
  await page.locator('[data-test-id="fisrtOTPDigit"]').fill('0');
  await page.locator('[data-test-id="secondOTPDigit"]').fill('0');
  await page.locator('[data-test-id="thirdOTPDigit"]').fill('0');
  await page.locator('[data-test-id="fourthOTPDigit"]').fill('0');

// 2. Click the checkbox inside the anchor frame
await recaptchaFrame.getByRole('checkbox', { name: /أنا لست برنامج روبوت|I'm not a robot/ }).click();
  await page.locator('[data-test-id="otp_submitForm"]').click();
  await page.locator('#close').click();

});

