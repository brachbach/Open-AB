const expect = require('chai').expect;
const request = require('supertest')('http://localhost:8080'); // can and probably should factor out app.js and use that instead
const authController = require('../../../server/api/auth/controller.js');
const authDbQueries = require('../../../server/api/auth/db/dbQueries.js');
const db = require('../../../server/api/auth/db/dbConnection.js');

describe('Signup:', () => {

  before((done) => {
    db.query('DELETE FROM clients', (err, result) => {
      if (err) {
        console.error(err);
      }
      done();
    });
  });

  it('signs up user and redirects them to the dashboard', done => {
    const body = { email: 'test@gmail.com', password: 'abc123' };
    request
      .post('/api/signup')
      .send(body)
      .expect('Location', '/dashboard', done);
  });

  it('saves user info to the database on signup', done => {
     authDbQueries.checkEmail('test@gmail.com', (err, result) => {
      if (err) {
        console.error(err);
      }
      expect(result.rows.length).to.equal(1);
      done();
    });
  });

  it('rejects user with email already in database and redirects them to failure route', done => {
    const body = { email: 'test@gmail.com', password: 'abc123' };
    request
      .post('/api/signup')
      .send(body)
      .expect('Location', '/failure', done);
  });
  // add email validation/password validation and test it
});

describe('Signin:', () => {

  before((done) => {
    db.query('DELETE FROM clients', (err, result) => {
      if (err) {
        console.error(err);
      }
      console.log('about to create client');
      authDbQueries.createClient('test2@gmail.com', 'abcd123', (error, res) => {
        console.log('back in test file');
        if (error) {
          console.error(error);
        }
        done();
      });
    });
  });

  it('signs in user with valid username and password and redirects them to dashboard', done => {
    const body = { email: 'test2@gmail.com', password: 'abcd123' };
    request
      .post('/api/signin')
      .send(body)
      .expect('Location', '/dashboard', done);
  });

  it('rejects user with invalid username and redirects them to failure route', done => {
    const body = { email: 'wrong@gmail.com', password: 'abcd123' };
    request
      .post('/api/signin')
      .send(body)
      .expect('Location', '/failure', done);
  });

  it('rejects user with invalid password and redirects them to failure route', done => {
    const body = { email: 'test2@gmail.com', password: 'wrong' };
    request
      .post('/api/signin')
      .send(body)
      .expect('Location', '/failure', done);
  });
});
