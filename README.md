
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
We use a chi-square test to determine whether one version of the website leads to more conversions than the other.  
A. Version A of the page leads to a higher proportion of conversions (a higher proportion of the people visiting the page click the "Buy Now" button) than version B
B. B leads to more conversions than A 
C. the results of the test were inconclusive.
I'm trying to figure out the stats for this. My plan is:
1. Assume that: 
-the proportion of visitors converting on the less successful version is 0.1
-the proportion converting on the more successful version is 0.125
-p < 0.05
-power = 0.8.
According to this calculator (http://biomath.info/power/chsq.htm), that means I need 2587 people to visit each version of the page
2. Randomly assign each visitor to one version of the page or the other
3. Once each version of the page has gotten at least 2587 visitors, run a chi-square test (https://web.csulb.edu/~msaintg/ppa696/696stsig.htm) to determine if there was a significant difference between the results from one version to the otherr.

# Dev Setup
## Database Setup
Install Postgres (9.5.3)
Run Postgres Database
Find path to schema.sql file found in Open-AB/server/db/schema.sql
In terminal run the following command to create database with schema:
```
  /Applications/Postgres.app/Contents/Versions/9.5/bin/psql < [file path to schema.sql file]/schema.sql
```
Seed the database with test data:

```
  npm run seed-db
```

## Git workflow
To start working on a new feature:
```
git checkout develop 
git pull --rebase develop
git checkout -b [yourFeatureName]
```

To submit a PR:
```
git checkout -b [yourFeatureName]Squash
git rebase -i
  -squash your changes into ~3 commits with strong commit messages
git push origin [yourFeatureName]Squash
```
submit a pull request to the "develop" branch


