async function fillFormUsingJson(data) {
  const fs = require('fs');

  const info = fs.readFileSync(`${data}`, 'utf8');
  const managersObj = JSON.parse(info);
  const managersInfo = managersObj.managers;

  async function chooseCreateManager() {
    await $(selectorCreateManager).waitForDisplayed({ timeout: 5000 });
    await $(selectorCreateManager).click();
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

  const selectorCreateManager = '//ul[@id="first-nav-block"]/li[8]';
  const selectorForListCity = "//li[@id='autoComplete_result_1']";
  const createButton = "//button[@type='submit']";

  for (const manager in managersInfo) {
    await chooseCreateManager();
    for (let data in managersInfo[manager]) {
      switch (data) {
        case 'email':
          await setValue(`#${data}`, managersInfo[manager][data]);
          break;
        case 'password':
          await setValue(`#${data}`, managersInfo[manager][data]);
          break;
        case 'address1':
          await setValue(`#${data}`, managersInfo[manager][data]);
          break;
        case 'address2':
          await setValue(`#${data}`, managersInfo[manager][data]);
          break;
        case 'state':
          await $(`#${data}`).waitForDisplayed({ timeout: 5000 });
          await $(`#${data}`).click();
          await $(
            `//select[@id='${data}']/child::option[@value='${managersInfo[manager][data]}']`
          ).waitForDisplayed({ timeout: 5000 });
          await $(
            `//select[@id='${data}']/child::option[@value='${managersInfo[manager][data]}']`
          ).click();
          break;
        case 'zip':
          await setValue(`#${data}`, managersInfo[manager][data]);
          break;
        case 'city':
          await setValue(`#${data}`, managersInfo[manager][data]);
          await chooseCityFromList();
          await clickCreateButton();
          break;
      }
    }
    await clickCreateButton();
  }
}

module.exports = { fillFormUsingJson };
