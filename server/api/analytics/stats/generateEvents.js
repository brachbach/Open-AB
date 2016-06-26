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

const generateWithDefaultParams = () => {
  const startTime = 1466896596001;
  const aClickRate = 0.1;
  const aTotalVisits = 4567;
  const bClickRate = 0.125;
  const bTotalVisits = 4603;
  const timeframe = 2592000000;

  return generate(startTime, aClickRate, aTotalVisits, bClickRate, bTotalVisits, timeframe);
};

const generateDataForMultipleTests = (testsInfo) => {
  return testsInfo.map(testInfo => {
    const testData = generateWithDefaultParams();
    return {
      testName: testInfo.testName,
      testId: testInfo.testId,
      testData,
    };
  });
};

// enerateMultipleTestsWithDefaultParams produces data of the form:
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
      testName: 'buyNowButtonTest',
      testId: '3874E76',
    },
    {
      testName: 'subscribeNowButtonTest',
      testId: 'sd37489',
    },
    {
      testName: 'tryNowButtonTest',
      testId: 'hgU9084K',
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

// days * hours * minutes * seconds * milliseconds = 30 * 24 * 60 * 60 * 1000
