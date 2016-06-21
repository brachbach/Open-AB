module.exports = (app) => {
  app.post('/login',
    passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   })
    );
};