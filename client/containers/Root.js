const env = 'deployed';

if (env === 'deployed') {
  module.exports = require('./Root.prod');
} else {
  module.exports = require('./Root.dev');
}
