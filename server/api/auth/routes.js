const authController = require('./controller');

module.exports = (app) => {
  app.post('/signin', authController.signin);
  // app.post('')
};