const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');

const dummyCreateUser = (email, hashedPassword, cb) => {
  console.log('user created!');
  console.log(cb);
  cb({"email": "ben@gmail.com", "password": "abc123"});
};

const generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

exports.signin = passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login'}),
  
exports.signup = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = generateHash(password);
  console.log('hashedPassword:', hashedPassword);
  dummyCreateUser(email, hashedPassword, user => {
    req.login(user, function(err) {
        if (err) { return next(err); }
        console.log('user to login with after signup:', user);
        console.log('logged in and redirecting');
        return res.redirect('/');
      });
    }
  );
};


