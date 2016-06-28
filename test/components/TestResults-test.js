const expect = require('expect');

import formatStats from '../../client/formatStats.js';
// import generateEvents from '../../server/api/analytics/stats/generateEvents.js';
// import chiSquareAnalysis from '../../server/api/analytics/stats/chiSquareAnalysis.js';

const statsForAllTests = [{
    "testName": "buyNowButtonTest",
    "testId": "3874E76",
    "stats": {
      "sufficientTime": true,
      "sufficientVisits": true,
      "testResults": {
        "aVisitsConsidered": 2640,
        "aClicksConsidered": 275,
        "bVisitsConsidered": 2587,
        "bClicksConsidered": 523,
        "p": 0
      }
    }
  },
  {
    "testName": "tryNowButtonTest",
    "testId": "hgU9084K",
    "stats": {
      "sufficientTime": true,
      "sufficientVisits": true,
      "testResults": {
        "aVisitsConsidered": 2587,
        "aClicksConsidered": 1334,
        "bVisitsConsidered": 2588,
        "bClicksConsidered": 750,
        "p": 0
      }
    }
  },
  {
    "testName": "subscribeNowButtonTest",
    "testId": "sd37489",
    "stats": {
      "sufficientTime": true,
      "sufficientVisits": true,
      "testResults": {
        "aVisitsConsidered": 2652,
        "aClicksConsidered": 545,
        "bVisitsConsidered": 2587,
        "bClicksConsidered": 527,
        "p": 0.8721233142362803
      }
    }
  },
  {
    "testName": "actNowButtonTest",
    "testId": "asdas5489",
    "stats": {
      "sufficientTime": true,
      "sufficientVisits": false,
      "testResults": {
        "aVisitsConsidered": 2590,
        "aClicksConsidered": 245,
        "bVisitsConsidered": 2580,
        "bClicksConsidered": 777
      }
    }
  },
  {
    "testName": "signupNowButtonTest",
    "testId": "kjhghj876H",
    "stats": {
      "sufficientTime": false,
      "sufficientVisits": true,
      "testResults": {
        "aVisitsConsidered": 2588,
        "aClicksConsidered": 527,
        "bVisitsConsidered": 2629,
        "bClicksConsidered": 1081,
        "p": 0
      }
    }
  }
]

describe('Views stats', () => {

  // const tests = generateEvents.generateTimesForMultipleTests();
  // const stats = chiSquareAnalysis.computeStatsForTests(tests);
  const viewableStats = formatStats(statsForAllTests);

  it('should return correct test results', () => {
    expect(viewableStats[0].testResult).toBe('B wins!');
    expect(viewableStats[1].testResult).toBe('A wins!');
    expect(viewableStats[2].testResult).toBe('Test was inconclusive');
    expect(viewableStats[3].testResult).toBe('Not yet enough visitors');
    expect(viewableStats[4].testResult).toBe('Test has not yet run long enough (must run for at least one week)');
  });

  it('should return no conversion rates for incomplete and inconclusive tests', () => {
    expect(viewableStats[2].aConversionRate).toBe('--');
    expect(viewableStats[3].aConversionRate).toBe('--');
    expect(viewableStats[4].aConversionRate).toBe('--');
  });

  it('should properly format conversion rates', () =>  {
    expect(viewableStats[0].aConversionRate).toBe('10.42%');
    expect(viewableStats[0].bConversionRate).toBe('20.22%');
  });

});
