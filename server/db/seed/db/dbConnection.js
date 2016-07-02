const cfg = require('../config');
const pg = require('pg');

const clientLink = 'pg://farmConnect:9lXJfi7dD&e0@farmconnect1.cgvp1wmwkltn.us-west-2.rds.amazonaws.com:5432/farmdata';

// callback that allows for connection to the database
module.exports = {
  query: (text, cb) => {
    pg.connect(clientLink, (err, client, done) => {
      console.error(err);
      client.query(text, (err, result) => {
        done();
        cb(err, result);
      });
    });
  }
};

