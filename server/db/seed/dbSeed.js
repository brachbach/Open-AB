const async = require('async');

const generateEvents = require('../../api/analytics/stats/generateEvents.js');
const clientData = require('../../api/clientData.js');
const dbQry = require('./db/dbQueries');
const analyticsQry = require('../../api/analytics/db/dbQueries.js')

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
    console.log('inserting client');
    dbQry.insertPage(page.pageName, client.email, () => {
      console.log('inserting page');
      cb();
    });
  });
};

const insertClientData = () => {
  async.series([
    CB => {
      async.each(clientData, 

        (testData, cb) => {
          analyticsQry.createTest(testData, client.email, 
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                cb();
              }
            }
          );
        },

        (err) => {
          if (err) {
            console.log(err);
          } else {
            CB();
          }
        }
      );
    };
  ],

  (err, result) => {
    console.log(err, result);
  });
};

insertClientHardcodedData(insertClientData);

