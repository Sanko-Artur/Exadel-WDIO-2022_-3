const baseMethods = require('../task-2/BaseMethods');

const selectorForCheckStatus = '#status';

describe('Test for task 5 extra', async function () {
  before(async function () {
    await baseMethods.openURL();
    await baseMethods.loginIntoSystem();
  });

  context('Check status', async function () {
    it(`should wait for changing a status`, async function () {
      await baseMethods.waitForText(selectorForCheckStatus, 'Active', 10000);
    });
  });
});

// npx wdio run ./wdio.conf.js
