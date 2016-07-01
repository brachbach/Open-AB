'use strict';

const expect = require('chai').expect;
const pg = require('pg');
const exec = require('child_process').execSync;
const fs = require('fs');
const path = require('path');

process.env.NODE_ENV = 'test';

// dbQueries.js file to test
// assumes that the db will be seeded before the test is run

// const dbSeed = require('../../../server/db/seed/dbSeed.js');
const authQry = require('../../../server/api/auth/db/dbQueries');
const analyticQry = require('../../../server/api/analytics/db/dbQueries');
const eventQry = require('../../../server/listening/events/db/dbQueries');

const clientData = require('../../../server/api/clientData.js');
console.log(clientData);

describe('Client Queries from Auth Service for API Server', () => {

  let allResults;

  before(done => {
    analyticQry.getAllResults((err, result) => {
      if (err) {
        console.error(err);
      } else {
        allResults = result;
        done();
      }
    });
  });

  it('Should create tests with correct names', done => {
    const testNames = clientData.map(test => test.testName);
    expect(allResults[0].testName).to.be.oneOf(testNames);
    done();
  });
});
