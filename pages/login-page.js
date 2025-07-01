

const { By } = require('selenium-webdriver');

class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.usernameInput = By.css('[data-test="username"]');
        this.passwordInput = By.css('[data-test="password"]');
        this.loginButton = By.css('[data-test="login-button"]');
    }

    async open() {
        await this.driver.get('https://www.saucedemo.com/');
    }

    async enterUsername(username) {
        await this.driver.findElement(this.usernameInput).sendKeys(username);
    }

    async enterPassword(password) {
        await this.driver.findElement(this.passwordInput).sendKeys(password);
    }

    async clickLogin() {
        await this.driver.findElement(this.loginButton).click();
    }

    async login(username, password) {
        await this.open();
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }
}

// module untuk ekspor login page ke file lain
module.exports = LoginPage;