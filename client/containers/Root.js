if (process.env.NODE_ENV === 'dev') {
  module.exports = require('./Root.prod');
} else {
  module.exports = require('./Root.dev');
}
