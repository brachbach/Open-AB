const dbQry = require('./db/dbQueries');
const async = require('async');

const generateEvents = require('../../api/analytics/stats/generateEvents.js');
const clientData = require('../../api/clientData.js');

const clientHardcodedData = [
  {
    email: 'abcd@abcd.com',
    password: 'qwerasdfzxcv1234',
    pages: [
      {
        pageName: 'Homepage',
      },
    ],
  },
];

const client = clientHardcodedData[0];
const page = client.pages[0];

const insertClientHardcodedData = cb => {
  dbQry.insertClient(client.email, client.password, () => {
    dbQry.insertPage(page.pageName, client.email, () => {
      cb();
    });
  });
};

insertClientHardcodedData(() => 'success');

