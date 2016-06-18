const expressSession = require('express-session');
const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');
const LocalStrategy = require('passport-local').Strategy;

module.exports.passport = (app) => {
  app.use(expressSession({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());

  const dummyLookForUserInDB = (cb) => {
    cb(null, {email: 'ben@gmail.com', password: '$2a$10$yZct6A/xiP55dFJI9RRabO8y4dcpydRCTqkCLE9GzzJjl35X9huuu'});
  };

  const dummyUserFind = (id, cb) => {
    cb(null, {email: 'ben@gmail.com', password: '$2a$10$yZct6A/xiP55dFJI9RRabO8y4dcpydRCTqkCLE9GzzJjl35X9huuu'});
  };

  passport.use(new LocalStrategy( {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, done) => {
      dummyLookForUserInDB((err, user) => { //this is where to query the db
        // console.log(err, user);
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        if (!bcrypt.compareSync(password, user.password)) {  //need to use bcrypt here
          return done(null, false, { message: 'Incorrect password.' });
        }
        // console.log(done);
        return done(null, user);
      });
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    // User.findById(id, (err, user) => {  
    dummyUserFind(id, (err, user) => {
      console.log('deserialed user:', user);
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
