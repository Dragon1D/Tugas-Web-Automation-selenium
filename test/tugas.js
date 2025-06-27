// Memanggil library yang dibutuhkan
const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

// Grup tes utama untuk tugas SauceDemo
describe('Tugas Automate Website saucedemo.com', function () {

    // Test Case 1: Sukses Login

    it('berhasil melakukan login', async function () {

        // Buka browser Chrome baru untuk tes ini.
        let driver = await new Builder().forBrowser('chrome').build();
        
        try {
            await driver.get('https://www.saucedemo.com/');

            // 2. Cari elemen, lalu definisikan ke variabel
            let inputUsername = await driver.findElement(By.css('[data-test="username"]'));
            let inputPassword = await driver.findElement(By.css('[data-test="password"]'));
            let buttonLogin = await driver.findElement(By.css('[data-test="login-button"]'));

            // 3. Jalankan action untuk elemen yang sudah didefinisikan
            await inputUsername.sendKeys('standard_user');
            await inputPassword.sendKeys('secret_sauce');
            await buttonLogin.click();

            // --- ASSERTION ---
            // 4. Pastikan kita berhasil masuk ke halaman produk
            // Kita cek apakah logo produknya muncul (ter-display)
            await driver.wait(until.urlContains('/inventory.html'), 5000); // Tunggu URL berubah dulu
            let appLogo = await driver.findElement(By.className('app_logo'));
            assert(await appLogo.isDisplayed(), "Gagal login, logo aplikasi tidak ditemukan.");

        } finally {
            // --- TEARDOWN ---
            // 5. Tutup browser setelah tes selesai.
            await driver.quit();
        }
    });

    // Test Case 2: Sukses mengurutkan produk dari A-Z
    it('berhasil mengurutkan produk dari A-Z', async function () {

        let driver = await new Builder().forBrowser('chrome').build();

        try {

            // 1. Lakukan login terlebih dahulu
            await driver.get('https://www.saucedemo.com/');
            await driver.findElement(By.css('[data-test="username"]')).sendKeys('standard_user');
            await driver.findElement(By.css('[data-test="password"]')).sendKeys('secret_sauce');
            await driver.findElement(By.css('[data-test="login-button"]')).click();
            await driver.wait(until.urlContains('/inventory.html'), 5000);

            // 2. Klik dropdown dan pilih opsi "Name (A to Z)"

            let sortDropdown = await driver.findElement(By.css('[data-test="product-sort-container"]'));
            await sortDropdown.sendKeys('az'); // "az" adalah value untuk opsi A to Z

            // --- ASSERTION ---
            // 3. Ambil semua nama produk dan pastikan urutannya benar
            let itemElements = await driver.findElements(By.className('inventory_item_name'));
            let itemNames = await Promise.all(itemElements.map(element => element.getText()));
            
            // Buat versi yang seharusnya terurut untuk perbandingan
            let sortedItemNames = [...itemNames].sort();

            // Bandingkan isi kedua array, harus sama persis
            assert.deepStrictEqual(itemNames, sortedItemNames, "Gagal, urutan produk tidak sesuai A-Z");

        } finally {
            // --- TEARDOWN ---
            await driver.quit();
        }
    });
});
