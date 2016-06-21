const expressSession = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports.passport = (app) => {
  app.use(expressSession({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());

  const provideDummyData = function (cb) {
    cb(null, {email: 'ben@gmail.com', password: 'abc123'});
  };

  passport.use(new LocalStrategy( {
      usernameField: 'email',
      passwordField: 'password',
    },
    (username, password, done) => {
      provideDummyData((err, user) => {
        console.log(err, user);
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        if (user.password !== 'abc123') {
          return done(null, false, { message: 'Incorrect password.' });
        }
        console.log(done);
        return done(null, user);
      });
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};

module.exports.db = {
  db: {
    host: 'localhost',
    port: 5432,
    dbName: 'openab',
  },
};
