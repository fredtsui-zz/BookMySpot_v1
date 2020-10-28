# BookMySpot_v1
event booking app

##Installation

### 1. prerequisites & installation
-  required `yarn, npm`
-  run `npm -g install yarn` to install yarn globally
-  `nodemon` is required to run backend, run `yarn global add nodemon` to install
-  when you are in this directory run the following commands to install dependencies 
```
npm install
cd client
npm install
``` 
-  the app currently requires a MySQL instance to fetch data from running at port `3306`, you can install MySQL community version from https://www.mysql.com/products/community/ 
- after installation create a new database named `eventorg`, import (run) `schema.sql` in the database to create schemas, then create a test user with username 'testuser' and password 'password'
  

### 2. startup
  `yarn dev`
  
### 3. Database, schema import

- run `database\<latestdump.sql>` in MySQL