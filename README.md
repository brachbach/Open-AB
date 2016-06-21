# Open-AB

# Dev Setup
## Database Setup
Install Postgres (9.5.3)
Run Postgres Database
Find path to schema.sql file found in Open-AB/server/db/schema.sql
In terminal run the following command to create database with schema:
  /Applications/Postgres.app/Contents/Versions/9.5/bin/psql < [file path to schema.sql file]/schema.sql
Seed the database with test data by running the following command in your terminal from the root directory of repo:
  node server/db/seed/dbSeed.js

## Git workflow
To start working on a new feature:
-git checkout develop, git pull --rebase develop
-git checkout -b [yourFeatureName]

When a PR is merged and you want those 


