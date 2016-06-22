const passport = require('passport');
const dbQry = require('./db/dbQueries');

exports.signin = passport.authenticate('local', { successRedirect: '/dashboard', failureRedirect: '/failure', failureFlash: true }); // could simply put in the function to deal w/ errors here, I think 

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  dbQry.createClient(email, password, (err, response) => {  // ought to validate email and password here
    if (err) {
      return next(err); // error code 500
    }
    if (response === false) {
      return res.redirect('/failure');
    }
    return req.login(response, (error) => {  // I expect this to error properly
      if (error) { return next(error); }
      return res.redirect('/dashboard');
    });
  });
};

exports.checkAuthServer = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).json({ message: 'not logged in' });
  }
};
