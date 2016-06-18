const passport = require('passport');

var dummyCreateUser = (user, cb) => {
  console.log('user created!');
  console.log(cb);
  cb({"email": "ben@gmail.com", "password": "abc123"});
};

exports.signin = passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login'}),
  
exports.signup = (req, res) => {
  let user = req.body;
  console.log('user:', user);
  dummyCreateUser(user,

    req.login(user, function(err) {
        if (err) { return next(err); }
        console.log('logged in and redirecting');
        return res.redirect('/');
      })
    );
};


