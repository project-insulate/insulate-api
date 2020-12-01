const handleError = require("./helper");
const coil = require("../services/coil");
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const User = require("../models/user");
const Provider = require("../models/provider");
const Block = require("../models/block");
const add = require('date-fns/add');
const isAfter = require('date-fns/isAfter');

async function create(req, res) {

  /**
   ** Step 1: Get access and refresh token from user using uid
   ** Step 2: Verify user is valid using BTP call
   ** Step 3: Get client secret from client id
   ** Step 4: Create a hash using client secret, paymentPointer, transactionId
   ** Step 5: Create block with hash, date of expiry, already used boolean
   ** Step 6: Save block and return transactionId
   *
   * ? Look into reusing access token, right now generate new one always
   * ? Review handling of the case where btpToken is not found
   * ? Check if block exists in last 5 minutes
  */
  try {
    const { uid } = res.locals;
    const { clientId, paymentPointer } = req.body;

    // Step 1
    const user = await User.findById(uid).select('+refresh_token');
    if (!user) {
      throw new Error(`User with id ${uid} not found`)
    }

    // Step 2
    // Get fresh access token
    const freshTokens = await coil.getAccessToken(user.refresh_token)
    user.access_token = freshTokens.access_token;
    user.refresh_token = freshTokens.refresh_token;
    await user.save();

    // Step 3
    const btpTokenData = await coil.getBTPToken(user.access_token);
    if (!btpTokenData || !btpTokenData.btpToken) {
      throw new Error("User does not have active Coil subscription, ignoring block");
    }

    // Step 4
    const provider = await Provider.findOne({ client_id: clientId }).select('+client_secret')
    if (!provider) {
      throw new Error(`Provider with client id: ${clientId} not found`);
    }
    const transactionId = uuidv4();
    const joinedValues = `${provider.client_secret}::${paymentPointer}::${transactionId}`
    const hash = crypto.createHash('sha256').update(joinedValues, 'utf8').digest('hex');

    // Step 5
    const startDate = new Date();
    const endDate = add(startDate, { minutes: 5 });
    const block = await Block.create({
      hash,
      start_time: startDate,
      end_time: endDate,
      visited: false,
    })

    // Step 6
    return res.send({ transactionId });

  } catch (error) {
    return handleError(res, error);
  }
}

async function verify(req, res) {
  /**
   ** Step 1: Generate hash from client secret, paymentPointer and transactionId
   ** Step 2: Check if hash exists, date of expiry within 5 minutes
   ** Step 3: Mark hash as used
   ** Step 4: Return verification status\
   *
   * TODO: Use base64 as authorization verification, instead of client secret
  */

  try {

    // Step 1
    const { clientSecret, paymentPointer, transactionId } = req.body;
    const joinedValues = `${clientSecret}::${paymentPointer}::${transactionId}`
    const hash = crypto.createHash('sha256').update(joinedValues, 'utf8').digest('hex');

    console.log("hash", hash)
    // Step 2
    const blocks = await Block.find({ hash: hash });
    if (!blocks || blocks.length === 0) {
      return res.status(200).send({
        recordFound: false,
        oldRecordExisted: false
      })
    }

    // Step 3
    let recordToReturn = { recordFound: false };
    const currentTime = new Date();
    for (block of blocks) {
      if (isAfter(block.end_time, currentTime)) {
        recordToReturn = {
          recordFound: true,
          visitedBefore: block.visited,
          recordCreatedAt: block.start_time
        }
        block.visited = true;
        await block.save();
        break;
      }
    }

    // Step 4
    if (!recordToReturn.recordFound) {
      return res.status(200).send({
        recordFound: false,
        oldRecordExisted: true,
      })
    }
    else {
      return res.status(200).send(recordToReturn)
    }

  } catch (error) {
    return handleError(res, error);
  }

}

module.exports = {
  create,
  verify
};
