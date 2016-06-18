const passport = require('passport');

module.exports = {
  signin: passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   })
};