const baseMethods = require('../task-2/BaseMethods');

// async function fillFormUsingJson(data) {
//   const fs = require('fs');
//   const info = fs.readFileSync(`${data}`, 'utf8');
//   const managersObj = JSON.parse(info);
//   const managersInfo = managersObj.managers;
//   managersInfo.forEach(({ email, password, address1, address2, zip, city }) => {
//     it(`should creat a manager with email: ${email}, password: ${password}, address: ${address1} - ${address2}, zip: ${zip} and city: ${city}`, async function () {
//       await baseMethods.chooseCreatManager();
//       await browser.pause(4000);
//       await baseMethods.creatManager(
//         email,
//         password,
//         address1,
//         address2,
//         zip,
//         city
//       );
//       await browser.pause(4000);
//     });
//   });
// }

describe('Test for task 3 extra', async function () {
  before(async function () {
    await baseMethods.openURL();
    await baseMethods.loginIntoSystem();
    await browser.pause(2000);
  });

  context('Creating managers', async function () {
    it(`should create managers via function`, async function () {
      fillFormUsingJson('./specs/task-3-extra/task-3-managers.json');
    });
  });
});

// npx wdio run ./wdio.conf.js
