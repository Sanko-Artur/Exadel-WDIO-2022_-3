async function fillFormUsingJson(data) {
  const fs = require('fs');

  const info = fs.readFileSync(`${data}`, 'utf8');
  const managersObj = JSON.parse(info);
  const managersInfo = managersObj.managers;

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
    await $(selectorCreatManager).waitForDisplayed({ timeout: 5000 });
    await $(selectorCreatManager).click();
    for (let data in managersInfo[manager]) {
      if (data === 'email') {
        await $(inputForEmailManager).waitForDisplayed({
          timeout: 5000,
        });
        await $(inputForEmailManager).setValue(managersInfo[manager][data]);
      } else if (data === 'password') {
        await $(inputForPasswordManager).waitForDisplayed({
          timeout: 5000,
        });
        await $(inputForPasswordManager).setValue(managersInfo[manager][data]);
      } else if (data === 'address1') {
        await $(inputForAddress1Manager).waitForDisplayed({
          timeout: 5000,
        });
        await $(inputForAddress1Manager).setValue(managersInfo[manager][data]);
      } else if (data === 'address2') {
        await $(inputForAddress2Manager).waitForDisplayed({
          timeout: 5000,
        });
        await $(inputForAddress2Manager).setValue(managersInfo[manager][data]);
      } else if (data === 'zip') {
        await $(inputForZipManager).waitForDisplayed({
          timeout: 5000,
        });
        await $(inputForZipManager).setValue(managersInfo[manager][data]);
      } else if (data === 'city') {
        await $(inputForCityManager).waitForDisplayed({
          timeout: 5000,
        });
        await $(inputForCityManager).setValue(managersInfo[manager][data]);
        await $(selectorForListCity).waitForDisplayed({ timeout: 5000 });
        await $(selectorForListCity).click();
        await $(createButton).waitForDisplayed({ timeout: 5000 });
        await $(createButton).click();
      }
    }
  }
}

module.exports = { fillFormUsingJson };
