const { By } = require('selenium-webdriver');
const assert = require('assert');

class InventoryPage {
    constructor(driver) {
        this.driver = driver;
        // Definisikan elemen-elemen di halaman produk
        this.appLogo = By.className('app_logo');
        this.sortDropdown = By.css('[data-test="product-sort-container"]');
        this.inventoryItemNames = By.className('inventory_item_name');
    }

    // Definisikan aksi-aksi yang bisa dilakukan
    async sortProducts(order) {
        // 'az' untuk A-Z, 'za' untuk Z-A
        const dropdown = await this.driver.findElement(this.sortDropdown);
        await dropdown.sendKeys(order);
    }

    // Definisikan validasi (assertion) yang berhubungan dengan halaman ini
    async validateOnPage() {
        const logo = await this.driver.findElement(this.appLogo);
        assert(await logo.isDisplayed(), "Gagal login, tidak berada di halaman inventory.");
    }

    async validateSortOrder(expectedOrder) {
        const itemElements = await this.driver.findElements(this.inventoryItemNames);
        const itemNames = await Promise.all(itemElements.map(el => el.getText()));

        let sortedItemNames;
        if (expectedOrder === 'az') {
            sortedItemNames = [...itemNames].sort();
        } else if (expectedOrder === 'za') {
            sortedItemNames = [...itemNames].sort().reverse();
        }
        
        assert.deepStrictEqual(itemNames, sortedItemNames, `Gagal, urutan produk tidak sesuai ${expectedOrder}`);
    }
}

module.exports = InventoryPage;
