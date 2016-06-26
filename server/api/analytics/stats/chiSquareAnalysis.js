const generateEvents = require('./generateEvents');
const _ = require('lodash');

const sampleSize = 2587;
const dbQry = {};


dbQry.getAllResults = (cb) => {   // dummy version
  const tests = generateEvents.generateTimesForMultipleTests();
  const result = {};
  result.rows = tests;
  // console.log(result.rows[0]);
  cb(null, result);
};

exports.getStats = getStats = (req, res, next) => {
  dbQry.getAllResults((error, result) => {
    if (error) {
      return next(error);
    }
    const testResults = result.rows;
    const statsArray = testResults.map((row) => {
      const stats = {
        aVisits: row.aVisits.length,
        aClicks: row.aClicks.length,
        bVisits: row.bVisits.length,
        bClicks: row.bClicks.length,
      };
      // console.log(stats);
      if (row.aVisits.length >= sampleSize && row.bVisits.length >= sampleSize) {
        const cutoffTime = row.aVisits[sampleSize - 1];
        
      }

      // stats.p = testSignificance(stats.aVisits, stats.aClicks, stats.bVisits, stats.bClicks,);
      return stats;
    });
  });
};
