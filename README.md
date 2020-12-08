# Project Insulate API

<img src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/> <img src ="https://img.shields.io/badge/MongoDB-%234ea94b.svg?&style=for-the-badge&logo=mongodb&logoColor=white"/> <a href="https://project-insulate.herokuapp.com/" target="_blank"><img src="https://img.shields.io/badge/heroku%20-%23430098.svg?&style=for-the-badge&logo=heroku&logoColor=white"/></a>
## Running Locally

Make sure you have [Node.js](http://nodejs.org/) (atleast v12.13.0, npm v6.12.0) installed.

```sh
git clone https://github.com/project-insulate/insulate-api.git
cd insulate-api
npm install
npm run start
```

## Environment Variables

Add a `.env` file in the root folder:

```
# Config
PORT=8000
NODE_ENV=development
MONGODB_URI=

# Firebase for User Management
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
FIREBASE_DATABASE_URL=

# SendGrid API for Email
SENDGRID_API_KEY=

# Coil authentication
COIL_SECRET_BASE64=
COIL_REDIRECT_URI=
```

## Deployment

Heroku pipeline is set to auto deploy `master` branch currently.
