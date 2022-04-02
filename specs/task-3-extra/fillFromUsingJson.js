async function fillFormUsingJson(data) {
  const fs = require('fs');

  const info = fs.readFileSync(`${data}`, 'utf8');
  const managersObj = JSON.parse(info);
  const managersInfo = managersObj.managers;

  async function chooseCreateManager() {
    await $(selectorCreatManager).waitForDisplayed({ timeout: 5000 });
    await $(selectorCreatManager).click();
  }

  async function setValue(selector, value) {
    await $(selector).waitForDisplayed({
      timeout: 5000,
    });
    await $(selector).setValue(value);
  }

  async function chooseCityFromList() {
    await $(selectorForListCity).waitForDisplayed({ timeout: 5000 });
    await $(selectorForListCity).click();
  }

  async function clickCreateButton() {
    await $(createButton).waitForDisplayed({ timeout: 5000 });
    await $(createButton).click();
  }

  const selectorCreatManager = '//ul[@id="first-nav-block"]/li[8]';
  const inputForEmailManager = '#email';
  const inputForPasswordManager = '#password';
  const inputForAddress1Manager = '#address1';
  const inputForAddress2Manager = '#address2';
  const inputForZipManager = '#zip';
  const inputForCityManager = "//input[@id='city']";
  const selectorForListCity = "//li[@id='autoComplete_result_1']";
  const createButton = "//button[@type='submit']";

  for (const manager in managersInfo) {
    await chooseCreateManager();
    for (let data in managersInfo[manager]) {
      if (data === 'email') {
        await setValue(inputForEmailManager, managersInfo[manager][data]);
      } else if (data === 'password') {
        await setValue(inputForPasswordManager, managersInfo[manager][data]);
      } else if (data === 'address1') {
        await setValue(inputForAddress1Manager, managersInfo[manager][data]);
      } else if (data === 'address2') {
        await setValue(inputForAddress2Manager, managersInfo[manager][data]);
      } else if (data === 'zip') {
        await setValue(inputForZipManager, managersInfo[manager][data]);
      } else if (data === 'city') {
        await setValue(inputForCityManager, managersInfo[manager][data]);
        await chooseCityFromList();
        await clickCreateButton();
      }
    }
  }
}

module.exports = { fillFormUsingJson };
