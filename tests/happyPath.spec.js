const { test, expect } = require('@playwright/test');
const { PDPPage } = require('./pages/PDPPage');
const { CheckoutPage } = require('./pages/CheckoutPage');

test.describe('Happy Path Checkout', () => {
  test('Complete checkout process', async ({ page }) => {
    const pdpPage = new PDPPage(page);
    const checkoutPage = new CheckoutPage(page);

    await pdpPage.goTo();
    await pdpPage.selectSize('UK 4');
    await pdpPage.addToBag();
    await pdpPage.proceedToReviewBag();

    await checkoutPage.proceedToCheckout();
    await checkoutPage.continueAsGuest('testuser@example.com');
    await checkoutPage.fillDeliveryDetails('Test', 'User', '1234567890', '123 Test Street');
    await checkoutPage.placeOrder();

    const confirmationText = await checkoutPage.verifyOrderConfirmation();
    expect(confirmationText).toContain('Thank you for your order');
  });
});