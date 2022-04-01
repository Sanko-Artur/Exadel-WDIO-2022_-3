function fillFormUsingJson(data) {
  const fs = require('fs');
  const info = fs.readFileSync(`${data}`, 'utf8');
  const managersObj = JSON.parse(info);
//   console.log(managersObj);

  const managersArr = managersObj.managers;
  
  console.log(managersArr[0]);
  console.log(managersArr[1]);

//   for (const a in managersArr) {
//     console.log(a);
//   }
}

fillFormUsingJson('./specs/task-3-extra/task-3-managers.json');

// node ./specs/task-3-extra/test.js
