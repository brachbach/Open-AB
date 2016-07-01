const async = require('async');

const generateEvents = require('../../api/analytics/stats/generateEvents.js');
const clientData = require('../../api/clientData.js');
const dbQry = require('./db/dbQueries');
const analyticsQry = require('../../api/analytics/db/dbQueries.js');
const listeningQry = require('../../../server/listening/events/db/dbQueries.js');

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

const eventsForAllTests = generateEvents.generateDataForMultipleTestsWithDefaultParams();

const insertClientHardcodedData = callback => {
  dbQry.insertClient(client.email, client.password, () => {
    console.log('inserting client');
    dbQry.insertPage(page.pageName, client.email, () => {
      console.log('inserting page');
      callback();
    });
  });
};

const insertClientData = callback => {
  async.each(clientData,

    (testData, cb) => {
      console.log('testData', testData);
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
        console.log('inserted tests');
        callback();
      }
    }
  );
};

const insertVersionVisits = (visitsArray, versionId) => {
  async.each(visitsArray,

    (visit, cb) => {
      visit.versionId = versionId;
      listeningQry.hearVisit(visit,
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
        console.log('inserted visits');
        return;
      }
    }
  );
};

const insertVersionClicks = (clicksArray, versionId) => {
  async.each(clicksArray,

    (click, cb) => {
      click.versionId = versionId;
      listeningQry.hearClick(click,
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
        console.log('inserted clicks');
        return;
      }
    }
  );
};

const insertAllEvents = allEvents => {
  allEvents.forEach((test, testIdx) => {
    const { aVisitsData, aClicksData, bVisitsData, bClicksData } = test.data;
    insertVersionVisits(aVisitsData, ((testIdx * 2) + 1));
    insertVersionClicks(aClicksData, ((testIdx * 2) + 1));
    insertVersionVisits(bVisitsData, (((testIdx * 2) + 1) + 1));
    insertVersionClicks(bClicksData, (((testIdx * 2) + 1) + 1));
  });
};

module.exports = () => insertClientHardcodedData(() => insertClientData(() => insertAllEvents(eventsForAllTests)));

insertClientHardcodedData(() => insertClientData(() => insertAllEvents(eventsForAllTests)));

