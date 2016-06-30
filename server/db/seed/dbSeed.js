const dbQry = require('./db/dbQueries');
const generateEvents = require('../../api/analytics/stats/generateEvents.js');

const clientData = [
  {
    email: 'abcd@abcd.com',
    password: 'qwerasdfzxcv1234',
    pages: [
      {
        pageName: 'Homepage',
        pageTests: generateEvents.generateDataForMultipleTestsWithDefaultParams(),
      },
    ],
  },
];

data.forEach(client => {
  // add client
  dbQry.insertClient(client.email, client.password, () => {
    // add pages
    client.pages.forEach(page => {
      dbQry.insertPage(page.pageName, datum.email, () => {
        // add test for page
        datum.tests.forEach(test => {
          if (test.page === pageName) {
            dbQry.addFilledTest(test.name, test.result_a, test.result_b, pageName, datum.email, () => {
              console.log('DONE WITH ', datum.email);
            });
          }
        });
      });
    });
  });
});
