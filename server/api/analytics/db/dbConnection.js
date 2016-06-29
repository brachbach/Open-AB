const cfg = require('../config');
const pg = require('pg');
const pgp = require('pg-promise')();

const clientLink = `postgres://${cfg.db.host}:${cfg.db.port}/${cfg.db.dbName}`;

// callback that allows for connection to the database
module.exports.pg = {
  query: (text, cb) => {
    pg.connect(clientLink, (err, client, done) => {
      client.query(text, (error, result) => {
        done();
        cb(error, result);
      });
    });
  },
};

module.exports.pgp = pgp(clientLink);
