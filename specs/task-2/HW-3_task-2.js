const baseMethods = require('./BaseMethods');

const managers = [
  {
    email: 'manager01@mail.ru',
    password: 123456,
    address1: 'Street01',
    address2: 'Dom01',
    zip: '01',
    city: 'USA',
    extra: 2,
  },
  {
    email: 'manager02@mail.ru',
    password: 654321,
    address1: 'Street02',
    address2: 'Dom02',
    zip: '02',
    city: 'Canada',
    extra: 3,
  },
];

describe('Test for task 2', async function () {
  before(async function () {
    await baseMethods.openURL();
    await baseMethods.loginIntoSystem();
  });

  context('Creating managers', async function () {
    managers.forEach(({ email, password, address1, address2, zip, city }) => {
      it(`should creat a manager with email: ${email}, password: ${password}, address: ${address1} - ${address2}, zip: ${zip} and city: ${city}`, async function () {
        await baseMethods.chooseCreatManager();
        await baseMethods.creatManager(
          email,
          password,
          address1,
          address2,
          zip,
          city
        );
      });
    });
  });

  context('Checking created managers', async function () {
    managers.forEach(({ email, address1, address2, zip, city, extra }) => {
      it(`should inspect created manager with email: ${email}`, async function () {
        await baseMethods.chooseListUsers();
        await baseMethods.checkManager(
          email,
          address1,
          address2,
          zip,
          city,
          extra
        );
      });
    });
  });
});

// npx wdio run ./wdio.conf.js
