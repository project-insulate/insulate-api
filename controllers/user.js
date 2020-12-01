const coil = require("../services/coil")
const firebase = require("../services/firebase")
const User = require("../models/user");
const handleError = require("./helper");


async function login(req, res) {
  try {
    // Step 1: use coil auth code to access token
    const tokenData = await coil.getTokens(req.body.authCode);
    console.log(tokenData);

    // Step 2: use access token to get coil uid
    const coilUIDInfo = await coil.getUserUID(tokenData.access_token);
    const coilUID = coilUIDInfo.sub;
    // const coilUID = "5e0e2f13-bcaa-448e-8e93-4976c67a6df9"
    console.log("coilUID", coilUID)

    // Step 3: save user access token in db
    const findUsers = await User.find({ coilUID: coilUID })

    let user;
    if (findUsers && findUsers.length > 0) {
      console.log(`User already exists, generating custom token for ${coilUID}`);
      user = findUsers[0];
    }
    else {
      console.log(`Generate new user and custom token for ${coilUID}`);
      user = await User.create({
        coilUID: coilUID,
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
      })
    }

    console.log("user", user, user._id, user.coilUID)
    // Step 4: use user._id and coil uid to generate firebase custom token
    const customToken = await firebase.createCustomToken(user._id, user.coilUID);

    // Step 5: return custom token
    return res.send({ customToken });
  }
  catch (err) {
    console.error(err);
    return handleError(res, err);
  }
}

async function token(req, res) {
  try {
    let token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjNlNTQyN2NkMzUxMDhiNDc2NjUyMDhlYTA0YjhjYTZjODZkMDljOTMiLCJ0eXAiOiJKV1QifQ.eyJjb2lsVUlEIjoiNWUwZTJmMTMtYmNhYS00NDhlLThlOTMtNDk3NmM2N2E2ZGY5IiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3Byb2plY3QtaW5zdWxhdGUiLCJhdWQiOiJwcm9qZWN0LWluc3VsYXRlIiwiYXV0aF90aW1lIjoxNjA2MTcwMzU0LCJ1c2VyX2lkIjoiNWZiYzFjZGQzYjNhMTM2ODdmNjQ1ZTBmIiwic3ViIjoiNWZiYzFjZGQzYjNhMTM2ODdmNjQ1ZTBmIiwiaWF0IjoxNjA2MTcwMzU2LCJleHAiOjE2MDYxNzM5NTYsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnt9LCJzaWduX2luX3Byb3ZpZGVyIjoiY3VzdG9tIn19.Y5pcwe741yTz6GvTgCMQgzUYc6acuDdbVQnmI176_pOdoU1L2eypRWCsIIqauoTVnocl0-5MlK1B2yUxmmh9XGWDr8gUmv_3Gwiz50iOGk2E_jlJhzJ5wWtbApJTAbDjJ36Cb9O3DhaQDJ-9k3-j3jmHiEAMlV2MQWg-n-Hl7aHFq0i38dlLmhWtZNirhNT5ugoY_b13u1ZPeUBP7BRz-3KtrGHomOsUIk_ACDzh1zaaYEBJ-SL5RXyW7k_anpv62Y8rLgTxS75v1wndULxMXbFKB3qXQgAbVCSoGlrnMLNAv16XHT7v8q1HKeRqNwZ9UTtoNrIk-8nmbOTj-B8UlA"
    const decodedToken = await firebase.verifyIdToken(token);
    return res.send({ decodedToken })
  } catch (error) {
    return handleError(res, err);
  }
}

module.exports = {
  login,
  token
};
