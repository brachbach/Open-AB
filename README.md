
# Open-AB <img src="https://github.com/Open-AB/Open-AB/blob/develop/client/assets/images/logo.png" height=100> [![Build Status](https://travis-ci.org/Open-AB/Open-AB.svg?branch=develop)](https://travis-ci.org/Open-AB/Open-AB)

Start testing your website today at http://50.112.197.243/ !

![](https://github.com/brachbach/Open-AB/blob/readme/readmeImages/createTestScreenshot.png)
![](https://github.com/brachbach/Open-AB/blob/readme/readmeImages/testScreenshot.png)
![](https://github.com/brachbach/Open-AB/blob/readme/readmeImages/mapScreenshot.png)

#The tech
##Tech stack
- Frontend: [React](https://facebook.github.io/react/), [Redux](https://github.com/reactjs/redux), [Google Charts](https://developers.google.com/chart/interactive/docs/gallery/intensitymap?csw=1), and [Chart.js](http://www.chartjs.org/)
- Backend: [Node.js](https://nodejs.org/en/), [Express](http://expressjs.com/), [Passport](http://passportjs.org/), and [Postgres](http://www.postgresql.org/)
- Testing: [Mocha](https://mochajs.org/), [Chai](http://chaijs.com/), [Karma](https://karma-runner.github.io/1.0/index.html), [SuperTest](https://github.com/visionmedia/supertest), and [Travis CI](https://travis-ci.org/)
- DevOps: [Amazon Web Services](https://aws.amazon.com/), [Webpack](https://webpack.github.io/), and [Babel](https://babeljs.io/)

##System architecture
![](https://github.com/brachbach/Open-AB/blob/readme/readmeImages/architectureDiagram.png)
##Database schema
![](https://github.com/brachbach/Open-AB/blob/readme/readmeImages/dbSchema.png)
##API
Endpoints listed [here](https://docs.google.com/document/d/1cEe9q_WKtF1gGvOY8mKO_YykiCYgUz5TyzkhNTzbVjw/edit#heading=h.3gm4p7cgyg85)

#The stats
We use a chi-square test to determine whether one version of the website leads to more conversions than the other:
*each test must run for at least a week before we provide results to make sure that the test results are stable over time
*our [calculations](https://docs.google.com/document/d/1Mr3FmaaBa3XHmD5YNFzMHgRZAZ0258tr77ghxRxVHcQ/edit) suggest that you will need about 2600 visitors to each version of your site before we can provide a helpful test result. Once you've had enough visitors, we let you know the results of your test.

# Run OpenA/B in the dev environment
```
  npm install
```

After setting up the database as described below,
```
  npm run dev:api-server
```
```
  npm run dev:listening-server
```
After setting up the data
## Database Setup
1. Install [PostgreSQL (9.5.3)](https://www.postgresql.org/download/)
1. Run
```
  psql
```
PostgreSQL must always be running while using OpenA/B
1. In another terminal window, find the filepath to the schema.sql file in Open-AB/server/db/schema.sql. Run the following command to create the openab db and test db:
```
  /Applications/Postgres.app/Contents/Versions/9.5/bin/psql < [file path to schema.sql file]/schema.sql
```
Seed the database with test data:

```
  npm run seed-db
```

