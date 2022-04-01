const baseMethods = require('../task-2/BaseMethods');

const { fillFormUsingJson } = require('./fillFromUsingJson.js')

describe('Test for task 3 extra', async function () {
  before(async function () {
    await baseMethods.openURL();
    await baseMethods.loginIntoSystem();
    await browser.pause(2000);
  });

  context('Creating managers', async function () {
    it(`should create managers via function`, async function () {
      await fillFormUsingJson('./specs/task-3-extra/task-3-managers.json');
    });
  });
});

// npx wdio run ./wdio.conf.js
