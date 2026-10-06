import { test, expect } from '@playwright/test';
import { LoginPage } from './Pages/LogInPage';

test('Login and Validate Checkout Payment Methods', async ({ page }) => {


  // Pause execution for manual inspection/debugging
  // await page.pause();

  // --------------------------------------------------------------------------
  // A LogIn with signed up email using POM
  // --------------------------------------------------------------------------
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('muath20foudeh@gmail.com', 'Password1!');

  // --------------------------------------------------------------------------
  // B Country Selection
  // --------------------------------------------------------------------------
  await page.getByRole('combobox', { name: /الأردن/ }).first().click();
  await page.getByRole('option', { name: 'الأردن' }).click();
  await expect(page.getByRole('combobox', { name: /الأردن/ }).first()).toBeVisible();

  // --------------------------------------------------------------------------
  // C Game and Package Selection
  // --------------------------------------------------------------------------
  await page.getByRole('textbox', { name: 'البحث عن' }).click();
  await page.getByRole('textbox', { name: 'البحث عن' }).fill('ارض الشجعان');
  await page.locator('#cdk-overlay-1').getByRole('heading', { name: 'ارض الشجعان' }).click();
  await page.getByText('3.54').first().click();
  

  // --------------------------------------------------------------------------
  // D Payment Methods Validation
  // --------------------------------------------------------------------------
  const paymentHeader = page.getByText('اختر طريقة الدفع');
  await paymentHeader.waitFor({ state: 'visible' });
  await paymentHeader.scrollIntoViewIfNeeded();
  // Tamatem Wallet locator (using data-test-id)
  const walletLocator = page.locator('[data-test-id="wallet_pay_using_tamatem_plus_wallet_label"]');

  // CliQ locator (text filter, container selector, or role/image fallback)
  const cliqLocator = page.locator('div').filter({ hasText: /^كليك$/ })
    .or(page.locator('.w-\\[120px\\]').first())
    .or(page.getByRole('img', { name: 'CliQ' }));

  // Visa / MasterCard locator (secondary payment card container)
  const cardLocator = page.locator('div:nth-child(2) > .flex > .logo > .w-\\[120px\\]')
    .or(page.getByRole('img', { name: /Visa|MasterCard/i }));

  // Scroll down to ensure external payment gateways (CliQ & Visa) enter the DOM viewport
  await cliqLocator.first().scrollIntoViewIfNeeded().catch(() => {});

  // Assert visibility for all expected payment options
  await expect(walletLocator).toBeVisible();
  await expect(cliqLocator.first()).toBeVisible();
  await expect(cardLocator.first()).toBeVisible();

  // Dynamically capture active payment methods from the UI
  const actualPaymentMethods = [];

  if (await walletLocator.isVisible()) {
    actualPaymentMethods.push('محفظة طماطم');
  }
  if (await cliqLocator.first().isVisible()) {
    actualPaymentMethods.push('CliQ');
  }
  if (await cardLocator.first().isVisible()) {
    actualPaymentMethods.push('Visa/MasterCard');
  }

  console.log('--- Displayed Payment Methods for Jordan ---');
  console.log(actualPaymentMethods);

  // Validate that displayed methods match the expected payment options
  const expectedPaymentMethods = ['محفظة طماطم', 'CliQ', 'Visa/MasterCard'];
  expect(actualPaymentMethods.length).toBe(3);
  expect(actualPaymentMethods).toEqual(expectedPaymentMethods);
});
