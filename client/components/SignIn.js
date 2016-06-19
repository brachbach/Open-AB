import React from 'react';

//how do I send a post request from this?

function SignIn () {
  return (
  <div>
    <h2>Sign in</h2>
    <form action="/login" method="post">
        <div>
          <label for="username">Username:</label>
          <input id="username" type="text" name="username" />
        </div>
        <div>
          <label for="password">Password:</label>
          <input id="password" type="password" name="password" />
        </div>
        <div>
          <input type="submit" value="Login" />
        </div>
    </form>
    <p>
      <a href="/signup">Create an Account &rarr;</a>
    </p>
  </div>
  );
}

export default SignIn;
