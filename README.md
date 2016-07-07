![](https://github.com/Open-AB/Open-AB/blob/develop/client/assets/images/logo.png)
# Open-AB
[![Build Status](https://travis-ci.org/Open-AB/Open-AB.svg?branch=develop)](https://travis-ci.org/Open-AB/Open-AB)
<img src="https://github.com/brachbach/Open-AB/blob/readme/readmeImages/createTestScreenshot.png" style="height:200px">
![](https://github.com/brachbach/Open-AB/blob/readme/readmeImages/testScreenshot.png)
![](https://github.com/brachbach/Open-AB/blob/readme/readmeImages/mapScreenshot.png)


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


