const { Builder, until } = require('selenium-webdriver');
const assert = require('assert');

// import POM class dari file terpisah
const LoginPage = require('../pages/login-page.js');
const InventoryPage = require('../pages/inventory.js');


describe('Tugas dengan Page Object Model (POM)', function () {
    let driver;
    let loginPage;
    let inventoryPage;

    before(async function () {
        this.timeout(30000);
        driver = await new Builder().forBrowser('chrome').build();
        loginPage = new LoginPage(driver);
        inventoryPage = new InventoryPage(driver);
    });

    after(async function () {
        await driver.quit();
    });

    it('Harus berhasil login menggunakan fungsi dari Page Object', async function () {
        await loginPage.login('standard_user', 'secret_sauce');
        
        // Validasi
        await driver.wait(until.urlContains('/inventory.html'), 5000);
        await inventoryPage.validateOnPage();
        console.log("Test Case Login dengan POM Berhasil!");
    });

    it('Harus berhasil mengurutkan produk dari A-Z menggunakan Page Object', async function () {
        await inventoryPage.sortProducts('az');
        
        // Validasi
        await inventoryPage.validateSortOrder('az');
        console.log("Test Case Sorting dengan POM Berhasil!");
    });
});
