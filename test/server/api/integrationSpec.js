const expect = require('chai').expect;
const request = require('supertest')('http://localhost:8080'); // can and probably should factor out app.js and use that instead
const authController = require('../../../server/api/auth/controller.js');
const authDbQueries = require('../../../server/api/auth/db/dbQueries.js');
const db = require('../../../server/api/auth/db/dbConnection.js');

// likely need to clear user on beforeEach
describe('Before:', () => {
  console.log('before');
 
});

describe('Signup:', () => {
  
  beforeEach((done) => {
    db.query('DELETE FROM clients', (err, result) => {
      if (err) {
        console.error(err);
      }
      done();
    });
  });

  it('signs up user with valid username and password', (done) => {
    var signupInfo = { email: 'test@gmail.com', password: 'abc123' };
    request
      .post('/api/signup')
      .send(signupInfo)
      .expect(302, done);

    authDbQueries.checkEmail('test@gmail.com', (err, result) => {
      if (err) {
        console.error(err);
      }
      expect(result.rows.length).to.equal(1);
    });
  });

  // add email validation/password validation and test it
});

describe('Signin:', function() {
  it('signs in user with valid username and password and redirects them to dashboard', (done) => {  // not yet actually testing for redirect
    var signupInfo = { email: 'test@gmail.com', password: 'abc123' };
    request
      .post('/api/signin')
      .send(signupInfo)
      .expect((res) => {
        // console.log('res', res);
        // console.log('res.headers.set-cookie:', res.headers['set-cookie']);
      })
      // .expect('redirect', '/')
      .expect(302, done);
  });
  // it('rejects user with invalid username with a 400, alerts that username is invalid', (done) => {  //after I get this working,do one for password as well 
  //   var signupInfo = { email: 'test@gmail.com', password: 'abc123' };
  //   request
  //     .post('/api/signin')
  //     .expect(400, done);
  // });
});
