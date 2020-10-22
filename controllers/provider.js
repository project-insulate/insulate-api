const handleError = require("./helper");
const _ = require("lodash");
const crypto = require("crypto");
const sendgrid = require("../services/sendgrid");
const constants = require("../constants");
const logger = require("../loaders/logger")("provider-controller");
const Provider = require("../models/provider");

async function create(req, res) {
  try {
    let provider = await Provider.findOne({ email: req.body.email });

    if (provider) {
      throw new Error("This email address has already been used");
    }

    const client_id = (await crypto.randomBytes(24)).toString("hex");
    const client_secret = (await crypto.randomBytes(24)).toString("hex");

    provider = await Provider.create({
      email: req.body.email,
      client_id: client_id,
      client_secret: client_secret,
    });

    // TODO: send email with credentials
    sendgrid.sendEmail(
      provider.email,
      provider,
      constants.emailTypes.PROVIDER_CREATE
    );

    await provider.save();

    logger.info(`Provider with email: ${provider.email} created`);

    return res.status(200).send(provider);
  } catch (err) {
    return handleError(res, err);
  }
}

module.exports = {
  create,
};
