const dbQry = require('./db/dbQueries');

exports.checkEmail = (req, res) => {
  // hardcoded test vars
  const clientEmail = 'abcd@abcd.com';
  // end hardcoded test vars

  dbQry.checkEmail(clientEmail, (error, result) => {
    // result is postgres db row result
    // result.rows[0].exists is boolean true if exists, false if not
    res.status(201).send(result);
  });
};

exports.signUp = (req, res) => {
  // hardcoded test vars
  const clientEmail = 'fds@abcd.com';
  const password = 'abcd1234'; // will need to be salt + hashed
  // end hardcoded test vars

  dbQry.createClient(clientEmail, password, (error, result) => {
    // result is postgres db row result
    // result.rows is empty array [] if email already exists, else
    // result.rows[0].id is unique id of clientEmail as number
    res.status(201).send(result);
  });
};

exports.signIn = (req, res) => {
  // hardcoded test vars
  const clientEmail = 'abcd@abcd.com';
  const password = 'qwerasdfzxcv1234'; // will need to be salt + hashed
  // end hardcoded test vars

  dbQry.signIn(clientEmail, password, (error, result) => {
    // result will be boolean false if
      // clientEmail does not exists OR password incorrect
    // result true if match
    if (result) {
      // replace boolean true with session or token
      res.status(201).send(true);
    } else {
      res.status(400).send({
        message: 'Email or password is invalid',
      });
    }
  });
};
