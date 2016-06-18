const passport = require('passport');

module.exports = (app) => {
  app.post('/signin',
    passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   })
    );
};