const baseMethods = require('./BaseMethods');

const managers = [
  {
    email: 'manager01@mail.ru',
    password: 123456,
    address1: 'Street01',
    address2: 'Dom01',
    state: 'US',
    zip: '01',
    city: 'USA',
  },
  {
    email: 'manager02@mail.ru',
    password: 654321,
    address1: 'Street02',
    address2: 'Dom02',
    state: 'CA',
    zip: '02',
    city: 'Canada',
  },
];

describe('Test for task 2', async function () {
  before(async function () {
    await baseMethods.openURL();
    await baseMethods.loginIntoSystem();
    await baseMethods.chooseCreateManager();
    await baseMethods.createManager(
      managers[0].email,
      managers[0].password,
      managers[0].address1,
      managers[0].address2,
      managers[0].state,
      managers[0].zip,
      managers[0].city
    );
    await baseMethods.chooseCreateManager();
    await baseMethods.createManager(
      managers[1].email,
      managers[1].password,
      managers[1].address1,
      managers[1].address2,
      managers[1].state,
      managers[1].zip,
      managers[1].city
    );
  });

  context('Checking created managers', async function () {
    managers.forEach(({ email, address1, address2, state, zip, city }) => {
      it(`should inspect created manager with email: ${email}`, async function () {
        await baseMethods.chooseListUsers();
        await baseMethods.checkManager(
          email,
          address1,
          address2,
          state,
          zip,
          city
        );
      });
    });
  });
});

// npx wdio run ./wdio.conf.js
