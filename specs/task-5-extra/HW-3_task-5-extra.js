const baseMethods = require('../task-2/BaseMethods');

const selectorForCheckStatus = '#status';

describe('Test for task 5 extra', async function () {
  before(async function () {
    await baseMethods.openURL();
    await baseMethods.loginIntoSystem();
    browser.addCommand(
      'waitForText',
      async function (text, timeout) {
        await this.waitForDisplayed({ timeout: 5000 });
        await this.click();
        await this.waitUntil(
          async function () {
            return (await this.getText()) === `${text}` && this.isDisplayed();
          },
          {
            timeout: `${timeout}`,
          }
        );
      },
      true
    );
  });

  context('Check status', async function () {
    it(`should wait for changing a status`, async function () {
      await $(selectorForCheckStatus).waitForText('Active', 10000);
    });
  });
});

// npx wdio run ./wdio.conf.js
