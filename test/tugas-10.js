const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');


describe('Tugas Automate Website dengan Hook Before, After', function () {

    let driver;
    // before hook
    before(async function () {
        // Beri waktu ekstra untuk membuka browser
        this.timeout(30000); 
        
        driver = await new Builder().forBrowser('chrome').build();
        console.log('SETUP: Browser berhasil dibuka.');
    });

    // after hook
    after(async function () {
        // Beri waktu ekstra untuk menutup browser
        this.timeout(30000);

        await driver.quit();
        console.log('Browser berhasil ditutup.');
    });

    it('Harus berhasil melakukan login', async function () {
        
        // 1. Pergi ke halaman login.
        await driver.get('https://www.saucedemo.com/');

        // 2. Cari elemen dan lakukan login
        await driver.findElement(By.css('[data-test="username"]')).sendKeys('standard_user');
        await driver.findElement(By.css('[data-test="password"]')).sendKeys('secret_sauce');
        await driver.findElement(By.css('[data-test="login-button"]')).click();

        // 3. Validasi (Assertion)
        await driver.wait(until.urlContains('/inventory.html'), 5000);
        let appLogo = await driver.findElement(By.className('app_logo'));
        assert(await appLogo.isDisplayed(), "Gagal login, logo aplikasi tidak ditemukan.");
        console.log("Test Case 1: Login Berhasil!");
    });

    // Test Case 2: Sukses mengurutkan produk dari A-Z
    it('Harus berhasil mengurutkan produk dari A-Z', async function () {

        
        // 1. Klik dropdown dan pilih opsi "Name (A to Z)"
        let sortDropdown = await driver.findElement(By.css('[data-test="product-sort-container"]'));
        await sortDropdown.sendKeys('az');

        // 2. Validasi (Assertion)
        let itemElements = await driver.findElements(By.className('inventory_item_name'));
        let itemNames = await Promise.all(itemElements.map(element => element.getText()));
        let sortedItemNames = [...itemNames].sort();

        assert.deepStrictEqual(itemNames, sortedItemNames, "Gagal, urutan produk tidak sesuai A-Z");
        console.log("Test Case 2: Urutkan A-Z Berhasil!");
    });
});
