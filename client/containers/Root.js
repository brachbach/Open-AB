console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'deployed') {
  module.exports = require('./Root.prod');
} else {
  module.exports = require('./Root.dev');
}
