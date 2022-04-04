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
    this.dropListWithStates = '#state';
    this.inputForZipManager = '#zip';
    this.inputForCityManager = "//input[@id='city']";
    this.selectorForListCity = "//li[@id='autoComplete_result_1']";
    this.createButton = "//button[@type='submit']";
    this.selectorListUsers = '//ul[@id="first-nav-block"]/li[10]';
    this.cellEmail = ".//child::div[@tabulator-field='email']";
    this.cellAddress1 = ".//child::div[@tabulator-field='address1']";
    this.cellAddress2 = ".//child::div[@tabulator-field='address2']";
    this.cellState = ".//child::div[@tabulator-field='state']";
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
    await $(this.spinner).waitForDisplayed({
      timeout: 15000,
      reverse: true,
      timeoutMsg: `After 15 sec the element: ${this.spinner} was not disappear`,
    });
  }

  async chooseCreatManager() {
    await $(this.selectorCreatManager).waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: ${this.selectorCreatManager} was not displayed`,
    });
    await $(this.selectorCreatManager).click();
  }

  async creatManager(email, password, address1, address2, state, zip, city) {
    await $(this.inputForEmailManager).waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: ${this.inputForEmailManager} was not displayed`,
    });
    await $(this.inputForEmailManager).setValue(email);

    await $(this.inputForPasswordManager).waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: ${this.inputForPasswordManager} was not displayed`,
    });
    await $(this.inputForPasswordManager).setValue(password);

    await $(this.inputForAddress1Manager).waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: ${this.inputForAddress1Manager} was not displayed`,
    });
    await $(this.inputForAddress1Manager).setValue(address1);

    await $(this.inputForAddress2Manager).waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: ${this.inputForAddress2Manager} was not displayed`,
    });
    await $(this.inputForAddress2Manager).setValue(address2);

    await $(this.dropListWithStates).waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: ${this.dropListWithStates} was not displayed`,
    });
    await $(this.dropListWithStates).click();

    await $(
      `//select[@id='state']/child::option[@value='${state}']`
    ).waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: //select[@id='state']/child::option[@value='${state}'] was not displayed`,
    });
    await $(`//select[@id='state']/child::option[@value='${state}']`).click();

    await $(this.inputForZipManager).waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: ${this.inputForZipManager} was not displayed`,
    });
    await $(this.inputForZipManager).setValue(zip);

    await $(this.inputForCityManager).waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: ${this.inputForCityManager} was not displayed`,
    });
    await $(this.inputForCityManager).setValue(city);

    await $(this.selectorForListCity).waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: ${this.selectorForListCity} was not displayed`,
    });
    await $(this.selectorForListCity).click();

    await $(this.createButton).waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: ${this.createButton} was not displayed`,
    });
    await $(this.createButton).click();
  }

  async chooseListUsers() {
    await $(this.selectorListUsers).waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: ${this.selectorListUsers} was not displayed`,
    });
    await $(this.selectorListUsers).click();
  }

  async checkManager(email, address1, address2, state, zip, city) {
    await $(`//div[contains(text() , "${email}")]/..`).waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: //div[contains(text() , "${email}")]/.. was not displayed`,
    });
    const rowOfUser = await $(`//div[contains(text() , "${email}")]/..`);

    await rowOfUser.$(this.cellEmail).waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: ${this.cellEmail} was not displayed`,
    });
    const emailManager = rowOfUser.$(this.cellEmail);
    await expect(emailManager).toHaveText(email);

    await rowOfUser.$(this.cellAddress1).waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: ${this.cellAddress1} was not displayed`,
    });
    const address1Manager = rowOfUser.$(this.cellAddress1);
    await expect(address1Manager).toHaveText(address1);

    await rowOfUser.$(this.cellAddress2).waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: ${this.cellAddress2} was not displayed`,
    });
    const address2Manager = rowOfUser.$(this.cellAddress2);
    await expect(address2Manager).toHaveText(address2);

    await rowOfUser.$(this.cellState).waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: ${this.cellState} was not displayed`,
    });
    const stateManager = rowOfUser.$(this.cellState);
    await expect(stateManager).toHaveText(state);

    await rowOfUser.$(this.cellZip).waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: ${this.cellZip} was not displayed`,
    });
    const zipManager = rowOfUser.$(this.cellZip);
    await expect(zipManager).toHaveText(zip);

    await rowOfUser.$(this.cellCity).waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: ${this.cellCity} was not displayed`,
    });
    const cityManager = rowOfUser.$(this.cellCity);
    await expect(cityManager).toHaveText(city);
  }

  async fillFormUsingJson(data) {
    const fs = require('fs');

    const info = fs.readFileSync(`${data}`, 'utf8');
    const managersObj = JSON.parse(info);
    const managersInfo = managersObj.managers;

    async function chooseCreateManager(selector) {
      await $(selector).waitForDisplayed({ timeout: 5000 });
      await $(selector).click();
    }

    async function setValue(selector, value) {
      await $(selector).waitForDisplayed({
        timeout: 5000,
        timeoutMsg: `After 5 sec the element: ${selector} was not displayed`,
      });
      await $(selector).setValue(value);
    }

    async function chooseCityFromList(selector) {
      await $(selector).waitForDisplayed({
        timeout: 5000,
        timeoutMsg: `After 5 sec the element: ${selector} was not displayed`,
      });
      await $(selector).click();
    }

    async function clickCreateButton(selector) {
      await $(selector).waitForDisplayed({
        timeout: 5000,
        timeoutMsg: `After 5 sec the element: ${selector} was not displayed`,
      });
      await $(selector).click();
    }

    for (const manager in managersInfo) {
      await chooseCreateManager(this.selectorCreatManager);
      for (let data in managersInfo[manager]) {
        switch (data) {
          case 'email':
            await setValue(
              this.inputForEmailManager,
              managersInfo[manager][data]
            );
            break;
          case 'password':
            await setValue(
              this.inputForPasswordManager,
              managersInfo[manager][data]
            );
            break;
          case 'address1':
            await setValue(
              this.inputForAddress1Manager,
              managersInfo[manager][data]
            );
            break;
          case 'address2':
            await setValue(
              this.inputForAddress2Manager,
              managersInfo[manager][data]
            );
            break;
          case 'state':
            await $(this.dropListWithStates).waitForDisplayed({
              timeout: 5000,
            });
            await $(this.dropListWithStates).click();
            await $(
              `//select[@id='state']/child::option[@value='${managersInfo[manager][data]}']`
            ).waitForDisplayed({ timeout: 5000 });
            await $(
              `//select[@id='state']/child::option[@value='${managersInfo[manager][data]}']`
            ).click();
            break;
          case 'zip':
            await setValue(
              this.inputForZipManager,
              managersInfo[manager][data]
            );
            break;
          case 'city':
            await setValue(
              this.inputForCityManager,
              managersInfo[manager][data]
            );
            await chooseCityFromList(this.selectorForListCity);
            break;
        }
      }
      await clickCreateButton(this.createButton);
    }
  }

  async waitForText(selector, text, timeout) {
    await $(selector).waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: ${selector} was not displayed`,
    });
    await $(selector).click();
    await $(selector).waitUntil(
      async function () {
        return (await this.getText()) === `${text}` && this.isDisplayed();
      },
      {
        timeout: timeout,
        timeoutMsg: `expected text is different after ${timeout} ms`,
      }
    );
  }
}

module.exports = new BaseMethods();
