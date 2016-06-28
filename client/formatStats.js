const formatProportion = (a, b) => {
  const proportion = a / b;
  const toRound = proportion * 10000;
  const rounded = Math.round(toRound);
  return rounded / 100;
  // return `${String(percentageNum)}`;
};

module.exports = statsForAllTests => {
  return statsForAllTests.map(statsForTest => {

    const { sufficientTime, sufficientVisits, testResults } = statsForTest.stats;
    const aConversionRateNumber = formatProportion(testResults.aClicksConsidered, testResults.aVisitsConsidered);
    const bConversionRateNumber = formatProportion(testResults.bClicksConsidered, testResults.bVisitsConsidered);
    let testResult;
    let aConversionRate = '--';
    let bConversionRate = '--';

    if (!sufficientTime) {
      testResult = 'Test has not yet run long enough (must run for at least one week)';
    } else if (!sufficientVisits) {
      testResult = 'Not yet enough visitors';
    } else if (testResults.p > 0.05) {
      testResult = 'Test was inconclusive';
    } else {
      aConversionRate = `${String(aConversionRateNumber)}%`;
      bConversionRate = `${String(bConversionRateNumber)}%`;
      if (aConversionRateNumber > bConversionRateNumber) {
        testResult = 'A wins!';
      } else {
        testResult = 'B wins!';
      }
    }

    return { testResult, aConversionRate, bConversionRate };
  });
};
