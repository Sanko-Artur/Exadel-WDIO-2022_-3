class BaseMethods {
  constructor() {
    this.url = 'https://viktor-silakov.github.io/course-sut/index.html?quick';
    this.inputForLogin = '#login';
    this.inputForPassword = '#password';
    this.login = 'walker@jw.com';
    this.password = 'password';
    this.buttonLogin = 'button';
    this.spinner = '.spinner-border text-light';
    this.selectorCreateManager = '//ul[@id="first-nav-block"]/li[8]';
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

  async chooseCreateManager() {
    await $(this.selectorCreateManager).waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: ${this.selectorCreateManager} was not displayed`,
    });
    await $(this.selectorCreateManager).click();
  }

  async createManager(email, password, address1, address2, state, zip, city) {
    await this.setValue(this.inputForEmailManager, email);
    await this.setValue(this.inputForPasswordManager, password);
    await this.setValue(this.inputForAddress1Manager, address1);
    await this.setValue(this.inputForAddress2Manager, address2);

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

    await this.setValue(this.inputForZipManager, zip);
    await this.setValue(this.inputForCityManager, city);
    await this.chooseCityFromList();
    await this.clickCreateButton();
  }

  async chooseListUsers() {
    await $(this.selectorListUsers).waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: ${this.selectorListUsers} was not displayed`,
    });
    await $(this.selectorListUsers).click();
  }

  async setPathToElementThroughSelectors(parent, child) {
    await parent.$(child).waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: ${child} was not displayed`,
    });
    const element = parent.$(child);
    return element;
  }

  async checkManager(email, address1, address2, state, zip, city) {
    await $(`//div[contains(text() , "${email}")]/..`).waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: //div[contains(text() , "${email}")]/.. was not displayed`,
    });
    const rowOfUser = await $(`//div[contains(text() , "${email}")]/..`);

    const emailManager = await this.setPathToElementThroughSelectors(
      rowOfUser,
      this.cellEmail
    );
    await expect(emailManager).toHaveText(email);

    const address1Manager = await this.setPathToElementThroughSelectors(
      rowOfUser,
      this.cellAddress1
    );
    await expect(address1Manager).toHaveText(address1);

    const address2Manager = await this.setPathToElementThroughSelectors(
      rowOfUser,
      this.cellAddress2
    );
    await expect(address2Manager).toHaveText(address2);

    const stateManager = await this.setPathToElementThroughSelectors(
      rowOfUser,
      this.cellState
    );
    await expect(stateManager).toHaveText(state);

    const zipManager = await this.setPathToElementThroughSelectors(
      rowOfUser,
      this.cellZip
    );
    await expect(zipManager).toHaveText(zip);

    const cityManager = await this.setPathToElementThroughSelectors(
      rowOfUser,
      this.cellCity
    );
    await expect(cityManager).toHaveText(city);
  }

  async chooseCityFromList() {
    await $(this.selectorForListCity).waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: ${this.selectorForListCity} was not displayed`,
    });
    await $(this.selectorForListCity).click();
  }

  async clickCreateButton() {
    await $(this.createButton).waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: ${this.createButton} was not displayed`,
    });
    await $(this.createButton).click();
  }

  async setValue(selector, value) {
    await $(selector).waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: ${selector} was not displayed`,
    });
    await $(selector).setValue(value);
  }

  async fillFormUsingJson(data) {
    const fs = require('fs');

    const info = fs.readFileSync(`${data}`, 'utf8');
    const managersObj = JSON.parse(info);
    const managersInfo = managersObj.managers;

    for (const manager in managersInfo) {
      await this.chooseCreateManager();
      for (let data in managersInfo[manager]) {
        switch (data) {
          case 'email':
            await this.setValue(
              this.inputForEmailManager,
              managersInfo[manager][data]
            );
            break;
          case 'password':
            await this.setValue(
              this.inputForPasswordManager,
              managersInfo[manager][data]
            );
            break;
          case 'address1':
            await this.setValue(
              this.inputForAddress1Manager,
              managersInfo[manager][data]
            );
            break;
          case 'address2':
            await this.setValue(
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
            await this.setValue(
              this.inputForZipManager,
              managersInfo[manager][data]
            );
            break;
          case 'city':
            await this.setValue(
              this.inputForCityManager,
              managersInfo[manager][data]
            );
            await this.chooseCityFromList();
            break;
        }
      }
      await this.clickCreateButton();
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
