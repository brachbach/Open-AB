if (process.env.NODE_ENV === 'deployment') {
  module.exports = require('./Root.prod');
} else {
  module.exports = require('./Root.dev');
}
