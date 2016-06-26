'use strict';

const expect = require('chai').expect;

process.env.NODE_ENV = 'test';

const generateEvents = require('../../../server/api/analytics/stats/generateEvents.js');
const chiSquareAnalysis = require('../../../server/api/analytics/stats/chiSquareAnalysis.js');

describe('Events generator', () => {
// must change these params if they are changed for the default test generator in the file being tested
  const startTime = 1466896596001;
  const aClickRate = 0.1;
  const aTotalVisits = 4567;
  const bClickRate = 0.125;
  const bTotalVisits = 4603;
  const timeframe = 2592000000;

  describe('Generate full tests data', () => {

    const tests = generateEvents.generateMultipleTestsWithDefaultParams();
    const test = tests[0];
    const testData = test.testData;

    it('should produce tests with the correct name and id', () => {
      expect(test.testName).to.equal('buyNowButtonTest');
      expect(test.testId).to.equal('3874E76');
    });

    it('should generate the right number of visits', () => {
      expect(testData.aVisits.length).to.equal(4567);
      expect(testData.bVisits.length).to.equal(4603);
    });

    it('should probably generate a number of clicks within a certain range', () => {
      expect(testData.aClicks.length).to.be.within(((aClickRate - 0.25) * aTotalVisits), ((aClickRate + 0.25) * aTotalVisits));
      expect(testData.bClicks.length).to.be.within(((bClickRate - 0.25) * bTotalVisits), ((bClickRate + 0.25) * bTotalVisits));  
    });

    it('should generate visits of the correct format', () => {
      expect(typeof testData.aVisits[0].time).to.equal('number');
      expect(testData.aVisits[0].IPAdress.split('.')[0]).to.be.within(100, 999);
    });

    it('should generate clicks of the correct format', () => {
      expect(typeof testData.aClicks[0].time).to.equal('number');
      expect(testData.aClicks[0].IPAdress.split('.')[0]).to.be.within(100, 999);
    });
  });

  describe('Generate click and visit times arrays', () => {
    
    const tests = generateEvents.generateTimesForMultipleTests();
    const test = tests[0];

    it('should generate visits in the correct format', () => {
      expect(typeof test.aVisits[0]).to.equal('number');
    });

    it('should generate clicks in the correct format', () => {
      expect(typeof test.aClicks[0]).to.equal('number');
    });
  });
});

describe('Perform Chi Square Significance Analysis', () => {

  const results = chiSquareAnalysis.getStats();
});