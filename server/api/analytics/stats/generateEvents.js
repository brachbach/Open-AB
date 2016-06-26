const numString = length => {
  const range = Math.pow(10, length);
  const num = Math.floor((range / 10) + Math.random() * (range - range / 10));
  return String(num);
};

const sortEvents = events => events.sort((eventA, eventB) => (eventA.time - eventB.time));

const generateVersionData = (startTime, clickRate, totalVisits, timeframe) => {
  let visits = [];
  let clicks = [];
  for (let i = 0; i < totalVisits; i++) {
    const time = startTime + Math.floor((Math.random() * timeframe));
    const IPAdress = `${numString(3)}.${numString(3)}.${numString(3)}.${numString(2)}`;
    visits.push({ time, IPAdress });
    if (Math.random() < clickRate) {
      clicks.push({ time, IPAdress });
    }
  }
  visits = sortEvents(visits);
  clicks = sortEvents(clicks);
  return { visits, clicks };
};

const generate = (startTime, aClickRate, aTotalVisits, bClickRate, bTotalVisits, timeframe) => {
  const aData = generateVersionData(startTime, aClickRate, aTotalVisits, timeframe);
  const bData = generateVersionData(startTime, bClickRate, bTotalVisits, timeframe);
  return {
    aVisits: aData.visits,
    aClicks: aData.clicks,
    bVisits: bData.visits,
    bClicks: bData.clicks,
  };
};

exports.generateWithDefaultParams = () => {
  const startTime = 1466896596001;
  const aClickRate = 0.1;
  const aTotalVisits = 4567;
  const bClickRate = 0.17;
  const bTotalVisits = 4603;
  const timeframe = 2592000000;

  return generate(startTime, aClickRate, aTotalVisits, bClickRate, bTotalVisits, timeframe);
};

const generateDataForMultipleTests = (testsInfo) => {
  return testsInfo.map(testInfo => {
    const { startTime, aClickRate, aTotalVisits, bClickRate, bTotalVisits, timeframe } = testInfo.testParams;
    const testData = generate(startTime, aClickRate, aTotalVisits, bClickRate, bTotalVisits, timeframe);
    return {
      testName: testInfo.testName,
      testId: testInfo.testId,
      testData,
    };
  });
};

// generateMultipleTestsWithDefaultParams produces data of the form:
// [
//   {
//     testName: 'buyNowButtonTest',
//     testId: '3874E76',
//     testData: {
//       aVisits: [~, ~, ...],
//       aClicks: [~, ~, ...],
//       bVisits: [~, ~, ...],
//       bClicks: [~, ~, ...],
//     },
//   },
//   {...},
//   {...},
//   ...
// ]

// where ~ = {
//   IPAdress: 173.247.199.46
//   time: 1466896596001
// }

exports.generateMultipleTestsWithDefaultParams = generateMultipleTestsWithDefaultParams = () => {
  const testsInfo = [
    {
      testName: 'buyNowButtonTest', // B wins
      testId: '3874E76',
      testParams: {
        startTime: 1450896596001, // Wed Dec 23 2015 10:49:56 GMT-0800 (PST)
        aClickRate: 0.1,
        aTotalVisits: 4567,
        bClickRate: 0.2,
        bTotalVisits: 4603,
        timeframe: 2592000000, // ~30 days: days * hours * minutes * seconds * milliseconds = 30 * 24 * 60 * 60 * 1000
      },
    },
    {
      testName: 'tryNowButtonTest', // A wins
      testId: 'hgU9084K',
      testParams: {
        startTime: 1455896596001, //Fri Feb 19 2016 07:43:16 GMT-0800 (PST) 
        aClickRate: 0.5,
        aTotalVisits: 2890,
        bClickRate: 0.3,
        bTotalVisits: 2921,
        timeframe: 864000000, // ~10 days
      },
    },
    {
      testName: 'subscribeNowButtonTest', // Usually inconclusive (with the occasional false positive either way)
      testId: 'sd37489',
      testParams: {
        startTime: 1457896596001, // Sun Mar 13 2016 12:16:36 GMT-0700 (PDT) 
        aClickRate: 0.2,
        aTotalVisits: 3876,
        bClickRate: 0.2,
        bTotalVisits: 3843,
        timeframe: 964000000, // ~11 days
      },
    },
    {
      testName: 'actNowButtonTest', // Not yet enough clicks to declare a winner
      testId: 'asdas5489',
      testParams: {
        startTime: 1458896596001, // Fri Mar 25 2016 02:03:16 GMT-0700 (PDT) 
        aClickRate: 0.1,
        aTotalVisits: 2590,
        bClickRate: 0.3,
        bTotalVisits: 2580,
        timeframe: 764000000, // ~9 days
      },
    },
    {
      testName: 'signupNowButtonTest', // Hasn't run long enough to declare a winner
      testId: 'kjhghj876H',
      testParams: {
        startTime: 1459996596001, //Wed Apr 06 2016 19:36:36 GMT-0700 (PDT) 
        aClickRate: 0.2,
        aTotalVisits: 3876,
        bClickRate: 0.4,
        bTotalVisits: 3843,
        timeframe: 86400000, // ~1 day
      },
    },
  ];
  return generateDataForMultipleTests(testsInfo);
};

  // generateTimesForMultipleTests produces data of the form:
  // [
  //   {
  //     testName: 'buyNowButtonTest',
  //     testId: '3874E76',
  //     aVisits: [1466896596001, ..., ...],
  //     aClicks: [1466896544352, ..., ...],
  //     bVisits: [1466896435522, ..., ...],
  //     bClicks: [1466896435233, ..., ...],
  //   },
  //   {...},
  //   {...},
  //   ...
  // ]

exports.generateTimesForMultipleTests = () => {
  const tests = generateMultipleTestsWithDefaultParams();
  return tests.map(test => {
    const timesByVersionAndType = {};
    const testData = test.testData;
    for(let versionAndType in testData) {
      const mappedTestData = testData[versionAndType].map(event => event.time);
      timesByVersionAndType[versionAndType] = mappedTestData;
    }
    return {
      testName: test.testName,
      testId: test.testId,
      aVisits: timesByVersionAndType.aVisits,
      aClicks: timesByVersionAndType.aClicks,
      bVisits: timesByVersionAndType.bVisits,
      bClicks: timesByVersionAndType.bClicks,
    };
  });
};
