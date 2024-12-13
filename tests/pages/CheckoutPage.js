const { expect } = require('@playwright/test');
class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.checkoutLink = '//a[contains(text(), "Checkout")]';
    this.continueAsGuestButton = 'button:has-text("Continue as guest")';
    this.emailInput = '[data-testid="signInOrRegister"] input';
    this.deliveryContinueButton = 'button:has-text("Continue to Delivery")';
    this.firstNameInput = 'label:text("First Name*") + input';
    this.lastNameInput = 'label:text("Last Name*") + input';
    this.phoneInput = 'label:text("Phone Number*") + input';
    this.addressInput = 'label:text("Address Line1*") + input';
    this.paymentContinueButton = 'button:has-text("Submit to Continue")';
    this.orderConfirmation = '.order-confirmation';
    this.paymentError = '.payment-error';
  }

  async proceedToCheckout() {
    await this.page.waitForSelector('a[role="link"][name="Checkout"]:visible');
    await expect(this.page.getByRole('link', { name: 'Checkout' })).toBeVisible();
    await this.page.waitForTimeout(2000);
    await this.page.getByRole('link', { name: 'Checkout' }).click();
  }

  async continueAsGuest(email) {
    await this.page.locator(this.continueAsGuestButton).click();
    await this.page.locator(this.emailInput).fill(email);
    await this.page.locator('text=Continue').click();
  }

  async fillDeliveryDetails(firstName, lastName, phone, address) {
    await this.page.locator(this.firstNameInput).fill(firstName);
    await this.page.locator(this.lastNameInput).fill(lastName);
    await this.page.locator(this.phoneInput).fill(phone);
    await this.page.locator(this.addressInput).fill(address);
  }

  async placeOrder() {
    await this.page.locator(this.paymentContinueButton).click();
  }

  async verifyOrderConfirmation() {
    await this.page.waitForSelector(this.orderConfirmation);
    return await this.page.textContent(this.orderConfirmation);
  }

  async verifyPaymentError() {
    await this.page.waitForSelector(this.paymentError);
    return await this.page.textContent(this.paymentError);
  }
}
  
  module.exports = { CheckoutPage };