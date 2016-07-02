module.exports = (() => {
  const env = process.env.NODE_ENV;
  if (env === 'test') {
    return 'postgres://localhost:5432/test';
  } else if (env === 'deployed') {
    return {
      user: 'openab',
      database: 'openab',
      password: '&$X7zs#GH9Z7',  // TODO: don't publish this to the world!
      host: 'openab.cj3poakpg8kc.us-west-2.rds.amazonaws.com',
      port: 5432,
    };
  }
  return 'postgres://localhost:5432/openab';
})();
