const { test, expect } = require('@playwright/test');
const { PDPPage } = require('./pages/PDPPage');
const { CheckoutPage } = require('./pages/CheckoutPage');

test.describe('Unhappy Path Checkout', () => {
  test('Invalid card details', async ({ page }) => {
    const pdpPage = new PDPPage(page);
    const checkoutPage = new CheckoutPage(page);

    await pdpPage.goTo();
    await pdpPage.selectSize('UK 4');
    await pdpPage.addToBag();
    await pdpPage.proceedToReviewBag();

    await checkoutPage.proceedToCheckout();
    await checkoutPage.continueAsGuest('testuser@example.com');
    await checkoutPage.fillDeliveryDetails('Test', 'User', '1234567890', '123 Test Street');
    await page.fill('#card-number', '1234567890123456');
    await page.fill('#card-expiry', '12/25');
    await page.fill('#card-cvc', '123');
    await checkoutPage.placeOrder();

    const errorText = await checkoutPage.verifyPaymentError();
    expect(errorText).toContain('Invalid card details');
  });
});
