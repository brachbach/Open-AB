const cfg = require('../config');
const pg = require('pg');

const clientLink = 'pg://openab:&$X7zs#GH9Z7@openab.cj3poakpg8kc.us-west-2.rds.amazonaws.com:5432/openab';

// callback that allows for connection to the database
module.exports = {
  query: (text, cb) => {
    pg.connect(clientLink, (err, client, done) => {
      client.query(text, (err, result) => {
        done();
        cb(err, result);
      });
    });
  }
};

