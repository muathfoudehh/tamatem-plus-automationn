# Tamatem Plus E2E Test Automation Suite

Automated end-to-end regression testing framework built with **Playwright (JavaScript)** using the **Page Object Model (POM)** design pattern for [Tamatem Plus Store Testing Environment](https://stg-fe.tamatemplus.com/home).

---

## 📌 Test Scope & User Journey Coverage

This test suite validates the following user journey end-to-end:

### A. Email Sign Up and Login
* **Sign up:** Account creation using an email address.
* **Login:** Log in in a new test execution using the registered email address.
* **Profile Verification:** Verify that login succeeds and the correct user account is displayed.

### B. Country Selection
* **Country Target:** Ensure the selected country is set to **Jordan**.
* **Verification:** Verify that Jordan is reflected correctly before proceeding to checkout.

### C. Game and Package Selection
* **Game Search:** Search for **LOH (Land of Heroes / أرض الشجعان)**.
* **Package:** Select the **Monthly Card** package.

### D. Payment Methods Validation
* **Capture:** Capture and list all payment methods displayed for Jordan and the selected package.
* **Validation:** Verify that the displayed payment methods (`محفظة طماطم`, `CliQ`, `Visa/MasterCard`) match the expected options.

---

## 📁 Project Structure

```text
Playwright/
├── Pages/
│   └── LoginPage.js          # Page Object Model class
├── tests/
│   ├── A_signup.spec.js      # Sign-up automation script
│   ├── A_login.spec.js       # Login & account verification script
│   └── C_B_D.spec.js         # Country, package, and payment validation suite
├── recordings/               # Execution video recordings
│   ├── A_login.mp4
│   ├── A_signup.mp4
│   └── C_B_D.mp4
├── .gitignore                # Git exclusion configuration
├── package.json              # Dependencies and scripts
└── playwright.config.js      # Global Playwright configuration


