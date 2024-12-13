const { expect } = require('@playwright/test');
class PDPPage {
  constructor(page) {
    this.page = page;
    this.sizeDropdown = '[data-testid="size-select-button-dropdown"]';
    this.sizeOption = '';
    this.addToBagButton = 'button:has-text("Add to Bag")';
    this.reviewBagLink = 'a:has-text("Review Bag")';
    this.acceptCookiesButton = 'button:has-text("Accept All Cookies")';
    this.continueToShopButton = '#globale_popup span';
  }

  async goTo() {
    await this.page.goto('/palazzo-pant-black');
    await this.page.locator(this.acceptCookiesButton).click();

    // Wait for and click "Continue to Shop"
    const continueToShopButton = this.page.locator(this.continueToShopButton);
    await expect(continueToShopButton).toBeVisible({ timeout: 100000 });
    await continueToShopButton.click();
  }

  async selectSize(size) {
    this.sizeOption = `role=option[name="${size}"]`;
    await this.page.locator(this.sizeDropdown).click();
    await this.page.locator(this.sizeOption).click();
  }

  async addToBag() {
    await this.page.locator(this.addToBagButton).click();
  }

  async proceedToReviewBag() {
    await this.page.locator(this.reviewBagLink).click();
  }
}
module.exports = { PDPPage };
