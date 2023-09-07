# My first full stack project, MERN Recipe App

## Overview

Recipe app for my personal use and to showcase my skills.

### Installation

#### Server .env

Create a .env file in the /server directory and add the following lines

```
NODE_ENV = development
PORT = 5000
ATLAS_URI=your_mongo_db_uri
JWT_SECRET = your_secret_token
REFRESH_SECRET = your_refresh_token
```

/client/.env contains endpoints. Default is localhost:5000/

#### Depedencies

From the root directory:

1. cd client
2. npm install
3. cd ..
4. cd server
5. npm install

#### Run

After setting up your .env file, again from the root directory:

1.  cd server
2.  npm run dev
3.  cd ..
4.  cd client
5.  npm run dev
