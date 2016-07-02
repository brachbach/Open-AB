const cfg = require('../config');
const pg = require('pg');
const pgp = require('pg-promise')();

const clientLink = `pg://openab:&$X7zs#GH9Z7@openab.cj3poakpg8kc.us-west-2.rds.amazonaws.com:5432/openab`;

var connectionInfo = {
  user: 'openab',
  database: 'openab',
  password: '&$X7zs#GH9Z7',
  host: 'openab.cj3poakpg8kc.us-west-2.rds.amazonaws.com',
  port: 5432,
  // ssl: {
  //    pass all the same stuff here you'd pass to http://nodejs.org/api/tls.html#tls_tls_connect_options_callback 
  // }
};

// callback that allows for connection to the database
module.exports.pg = {
  query: (text, cb) => {
    pg.connect(connectionInfo, (err, client, done) => {
      if (client) {
        client.query(text, (error, result) => {
          done();
          cb(error, result);
        });
      } else {
        err.message = 'Database connection refused';
        cb(err, null);
      }
    });
  },
};

module.exports.pgp = pgp(connectionInfo);
