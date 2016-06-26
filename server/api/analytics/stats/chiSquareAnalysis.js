exports.getStats = (req, res, next) => {
  dbQry.getAllResults((error, result) => {
    if (error) {
      return next(error);
    }
    const testResults = result.rows;
    let statsArray = testResults.map((row) => {
      let stats = {
        aVisits: row.aVisits.length,
        aClicks: row.aClicks.length,
        bVisits: row.aVisits.length,
        bClicks: row.aClicks.length,
      };
      // if stats.(aVisits >)
      // stats.p = testSignificance(stats.aVisits, stats.aClicks, stats.bVisits, stats.bClicks,);
      return stats;
    });
    console.log(stats);
  });
}


