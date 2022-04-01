class BaseMethods {
  constructor() {
    this.url = 'https://viktor-silakov.github.io/course-sut/index.html?quick';
    this.inputForLogin = '#login';
    this.inputForPassword = '#password';
    this.login = 'walker@jw.com';
    this.password = 'password';
    this.buttonLogin = 'button';
    this.spinner = '.spinner-border text-light';
    this.selectorCreatManager = '//ul[@id="first-nav-block"]/li[8]';
    this.inputForEmailManager = '#email';
    this.inputForPasswordManager = '#password';
    this.inputForAddress1Manager = '#address1';
    this.inputForAddress2Manager = '#address2';
    this.inputForZipManager = '#zip';
    this.inputForCityManager = "//input[@id='city']";
    this.selectorForListCity = "//li[@id='autoComplete_result_1']";
    this.createButton = "//button[@type='submit']";
    this.selectorListUsers = '//ul[@id="first-nav-block"]/li[10]';
    this.cellEmail = ".//child::div[@tabulator-field='email']";
    this.cellAddress1 = ".//child::div[@tabulator-field='address1']";
    this.cellAddress2 = ".//child::div[@tabulator-field='address2']";
    this.cellZip = ".//child::div[@tabulator-field='zip']";
    this.cellCity = ".//child::div[@tabulator-field='city']";
    this.selectorForCheckStatus = '#status';
  }

  async openURL() {
    await browser.maximizeWindow();
    await browser.url(this.url);
  }

  async loginIntoSystem() {
    await $(this.inputForLogin).setValue(this.login);
    await $(this.inputForPassword).setValue(this.password);
    await $(this.buttonLogin).click();
    await $(this.spinner).waitForDisplayed({ timeout: 15000, reverse: true });
  }

  async chooseCreatManager() {
    await $(this.selectorCreatManager).waitForDisplayed({ timeout: 5000 });
    await $(this.selectorCreatManager).click();
  }

  async creatManager(email, password, address1, address2, zip, city) {
    await $(this.inputForEmailManager).waitForDisplayed({ timeout: 5000 });
    await $(this.inputForEmailManager).setValue(email);
    await $(this.inputForPasswordManager).waitForDisplayed({ timeout: 5000 });
    await $(this.inputForPasswordManager).setValue(password);
    await $(this.inputForAddress1Manager).waitForDisplayed({ timeout: 5000 });
    await $(this.inputForAddress1Manager).setValue(address1);
    await $(this.inputForAddress2Manager).waitForDisplayed({ timeout: 5000 });
    await $(this.inputForAddress2Manager).setValue(address2);
    await $(this.inputForZipManager).waitForDisplayed({ timeout: 5000 });
    await $(this.inputForZipManager).setValue(zip);
    await $(this.inputForCityManager).waitForDisplayed({ timeout: 5000 });
    await $(this.inputForCityManager).setValue(city);
    await $(this.selectorForListCity).waitForDisplayed({ timeout: 5000 });
    await $(this.selectorForListCity).click();
    await $(this.createButton).waitForDisplayed({ timeout: 5000 });
    await $(this.createButton).click();
  }

  async chooseListUsers() {
    await $(this.selectorListUsers).waitForDisplayed({ timeout: 5000 });
    await $(this.selectorListUsers).click();
  }

  async checkManager(email, address1, address2, zip, city, extra) {
    await $(
      `//div[starts-with(@class, "tabulator-row")][${extra}]`
    ).waitForDisplayed({
      timeout: 5000,
    });
    const rowOfUser = await $(
      `//div[starts-with(@class, "tabulator-row")][${extra}]`
    );

    await rowOfUser.$(this.cellEmail).waitForDisplayed({
      timeout: 5000,
    });
    const emailManager = rowOfUser.$(this.cellEmail);
    await expect(emailManager).toHaveText(email);

    await rowOfUser.$(this.cellAddress1).waitForDisplayed({
      timeout: 5000,
    });
    const address1Manager = rowOfUser.$(this.cellAddress1);
    await expect(address1Manager).toHaveText(address1);

    await rowOfUser.$(this.cellAddress2).waitForDisplayed({
      timeout: 5000,
    });
    const address2Manager = rowOfUser.$(this.cellAddress2);
    await expect(address2Manager).toHaveText(address2);

    await rowOfUser.$(this.cellZip).waitForDisplayed({
      timeout: 5000,
    });
    const zipManager = rowOfUser.$(this.cellZip);
    await expect(zipManager).toHaveText(zip);

    await rowOfUser.$(this.cellCity).waitForDisplayed({
      timeout: 5000,
    });
    const cityManager = rowOfUser.$(this.cellCity);
    await expect(cityManager).toHaveText(city);
  }

  async waitForText(selector, text, timeout) {
    await $(selector).waitForDisplayed({ timeout: 5000 });
    await $(selector).click();
    await $(selector).waitUntil(
      async function () {
        return (await this.getText()) === `${text}` && this.isDisplayed();
      },
      {
        timeout: `${timeout}`,
      }
    );
  }
}

module.exports = new BaseMethods();
