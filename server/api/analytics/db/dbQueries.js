const db = require('./dbConnection').pg;
const dbpgp = require('./dbConnection').pgp;
const qry = require('./dbQryStrs');
const uuid = require('uuid');

// get all results in DB
exports.getAllResults = (cb) => {

  dbpgp.query("select * from tests")
    .then(tests => {
      // console.log('tests:', tests);
      results = [];
      counter = 0
      return tests.forEach(test => {
        dbpgp.query('select * from visits where version_id = (select id from versions where ab = $1 and test_id = $2)', ['a', test.id])
        .then(response => {
          results.push([test, response]);
          counter++;
          if (counter === tests.length) {
            console.log('results', results);
          }
        });
      });
  });
};


// [ anonymous {
//     id: 1,
//     page_id: 1,
//     name: 'test1',
//     result_a: 0,
//     result_b: 0,
//     uniqueid: '160a84f9-f352-40c3-abbe-bdf34a26348f' },
//   anonymous {
//     id: 2,
//     page_id: 1,
//     name: 'test2',
//     result_a: 0,
//     result_b: 0,
//     uniqueid: '0bd031ef-203e-4263-885b-3e9a4c738ffe' },
//   anonymous {
//     id: 3,
//     page_id: 2,
//     name: 'test3',
//     result_a: 0,
//     result_b: 0,
//     uniqueid: '46344a54-b3b1-44cd-9282-c4a50aeecc98' },
//   anonymous {
//     id: 4,
//     page_id: 2,
//     name: 'test4',
//     result_a: 0,
//     result_b: 0,
//     uniqueid: '09642550-261a-4ba4-a2fc-f0fdb5bb6b6b' } ]


// db.task(function (t) {
//         // this = t = task protocol context;
//         // this.ctx = task config + state context;
//         return t.one("select * from users where id=$1", 123)
//             .then(function (user) {
//                 return t.any("select * from events where login=$1", user.name);
//             });
//     })
//     .then(function (events) {
//         // success;
//     })
//     .catch(function (error) {
//         console.log("ERROR:", error.message || error);    
//     });






exports.createPage = (pageName, clientEmail, cb) => {
  db.query({
    text: qry.createPage,
    values: [pageName, clientEmail],
  }, cb);
};

exports.createTest = (testData, clientEmail, cb) => {
  const { testName, pageId, a, b } = testData;
  const uniqueId = uuid.v4();
  dbpgp.tx(t => {
    const addTest = t.query(qry.createTest, [testName, pageId, clientEmail, uniqueId]);
    const addVersionA = t.query(qry.insertVersion, ['a', a.url, a.DOMLocation, uniqueId]);
    const addVersionB = t.query(qry.insertVersion, ['b', b.url, b.DOMLocation, uniqueId]);
    return t.batch([addTest, addVersionA, addVersionB]);
  })
  .then(result => {
    cb(null, result);
  })
  .catch(err => {
    cb(err, null);
  });
};

exports.getResultForTestID = (testID, cb) => {
  db.query({
    text: qry.getResultForTestID,
    values: [testID],
  }, cb);
};

exports.getPageTests = (pageName, clientEmail, cb) => {
  db.query({
    text: qry.getPageTests,
    values: [pageName, clientEmail],
  }, cb);
};

exports.getClientTests = (clientEmail, cb) => {
  db.query({
    text: qry.getClientTests,
    values: [clientEmail],
  }, cb);
};

exports.getClientPages = (clientEmail, cb) => {
  db.query({
    text: qry.getClientPages,
    values: [clientEmail],
  }, cb);
};
