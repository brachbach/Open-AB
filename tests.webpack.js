// /**
//  * https://webpack.github.io/docs/context.html
//  * load each test file into the webpack context

var context = require.context('./test/components', true, /-test/);
console.log('in tests.webpack');
context.keys().forEach(context);
