export class LoginPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.initialClosePopup = this.page.locator('#close > svg');
    this.signupButton = this.page.locator('[data-test-id="signup_button"]');
    this.emailFieldTab = this.page.getByText('البريد الإلكتروني أو رقم الهاتف المحمول');
    this.emailInput = this.page.locator('[data-test-id="email"]');
    this.passwordInput = this.page.locator('[data-test-id="password"]');
    this.recaptchaCheckbox = this.page
      .frameLocator('iframe[src*="recaptcha/api2/anchor"]')
      .getByRole('checkbox', { name: /أنا لست برنامج روبوت|I'm not a robot/ });
    this.submitButton = this.page.locator('[data-test-id="submitForm_signin_by_email"]');
    this.postLoginClosePopup = this.page.locator('#close');
  }

  async goto() {
    await this.page.goto('https://stg-fe.tamatemplus.com/home', { waitUntil: 'domcontentloaded' });
    await this.initialClosePopup.click();
    await this.signupButton.click();
  }

  async login(email, password) {
    await this.emailFieldTab.click();
    await this.emailInput.click();
    await this.emailInput.fill(email);

    await this.passwordInput.click();
    await this.passwordInput.fill(password);

    await this.recaptchaCheckbox.click();
    await this.submitButton.click();

    // Conditionally click postLoginClosePopup if it appears, without timing out
    if (await this.postLoginClosePopup.isVisible({ timeout: 5000 }).catch(() => false)) {
      await this.postLoginClosePopup.click();
    }
}
}