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


module.exports = {
  login,
};
