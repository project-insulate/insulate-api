# Project Insulate API

<img src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/> <img src ="https://img.shields.io/badge/MongoDB-%234ea94b.svg?&style=for-the-badge&logo=mongodb&logoColor=white"/> 

Project Insulate aims to protect an API call used by a provider to send data when dependent on Web Monetization. Currently, the only way to fetch data is to keep the endpoint public if no paid-user login is present on the UI. Also, this project ensures no user PPI is shared with the provider to maintain the privacy component of the Web Monetization technology.

## Deployment
<a href="https://project-insulate.herokuapp.com/" target="_blank"><img src="https://img.shields.io/badge/heroku%20-%23430098.svg?&style=for-the-badge&logo=heroku&logoColor=white"/></a>

Heroku pipeline is set to auto deploy `master` branch currently.

## Main functionality for Providers
1. **Registration**: This will return you `client_id` and `client_secret`
 ```
curl --request POST 'https://project-insulate.herokuapp.com/api/provider' \
     --data-urlencode 'email=hello@test.com'
```

2. **Verify transaction**: This will return you if the transaction was successfully added in last 5 minutes, if so, has it been used (by any previous verification call).
```
curl --request POST 'https://project-insulate.herokuapp.com/api/block/verify' \
--header 'Content-Type: application/json' \
--data-raw '{
    "paymentPointer": "$ilp.uphold.com/H3NqAwkm9g3W",
    "clientSecret": "10cc6c3ea96bb3ab525c61af71dfa1e58d11159cfd5de3d6",
    "transactionId": "c3798dce-4893-497e-8b80-f48a52896eda"
}'
```


## API Documentation
<a href="https://documenter.getpostman.com/view/1085264/TVmS6uzb" target="_blank"><img src="https://img.shields.io/badge/-POSTMAN-orange?&style=for-the-badge&logo=postman&logoColor=white"/></a>

## Architectural Diagram
**Current system (without Insulate)** ❌

<img src="https://i.imgur.com/ZJZfxwe.png" width="500" />

**Proposed system using Insulate** ✅

<img src="https://i.imgur.com/oF32o9r.png" />

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
NODE_ENV=development/production
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

