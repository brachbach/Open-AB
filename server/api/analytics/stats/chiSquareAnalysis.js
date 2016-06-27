const generateEvents = require('./generateEvents');
const _ = require('lodash');

const sampleSize = 2587;

// const sampleSize = 2587 b/c we assume that:
// -the proportion of visitors converting on the less successful version is 0.1
// -the proportion converting on the more successful version is 0.125
// -p < 0.05
// -power = 0.8.
// According to this calculator (http://biomath.info/power/chsq.htm), that means we need 2587 people to visit each version of the page

const dbQry = {};

dbQry.getAllResults = (cb) => {   // dummy version
  const tests = generateEvents.generateTimesForMultipleTests();
  const result = {};
  result.rows = tests;
  // console.log(result.rows[0]);
  cb(null, result);
};

// returns data of the form: {
//   sufficientTime: true,
//   sufficientVisits: true,
//   stats: {
//     aVisitsConsidered: 2587,
//     aClicksConsidered: 400,
//     bVisitsConsidered: 2600,
//     bClicksConsidered: 300,
//     p: 0.04,
//   },
// }

exports.getStats = getStats = (req, res, next) => { //use dbQry as an arg for testing purposes?
  dbQry.getAllResults((error, result) => {
    if (error) {
      return next(error);
    }
    const testResults = result.rows;
    const statsArray = testResults.map((row) => {
      // const stats = {
      //   aVisits: row.aVisits.length,
      //   aClicks: row.aClicks.length,
      //   bVisits: row.bVisits.length,
      //   bClicks: row.bClicks.length,
      // };
      // console.log(stats);
      if (row.aVisits.length >= sampleSize && row.bVisits.length >= sampleSize) {
        var sufficientVisits:
        const cutoffTime = Math.max(row.aVisits[sampleSize - 1], row.aVisits[sampleSize - 1]);

      }

      // stats.p = testSignificance(stats.aVisits, stats.aClicks, stats.bVisits, stats.bClicks,);
      return stats;
    });
  });
};
