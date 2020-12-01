let { Router } = require("express");
let { celebrate, Joi } = require("celebrate");
const route = Router();
let { isAuthenticated } = require("../../middlewares");


let { create, verify } = require("../../controllers/block");

module.exports = (app) => {
  app.use("/block", route);

  route.post(
    "/",
    isAuthenticated,
    celebrate({
      body: Joi.object({
        paymentPointer: Joi.string().required(),
        clientId: Joi.string().required(),
      }),
    }),
    [create]
  );

  route.post(
    "/verify",
    celebrate({
      body: Joi.object({
        paymentPointer: Joi.string().required(),
        clientSecret: Joi.string().required(),
        transactionId: Joi.string().required(),
      }),
    }),
    [verify]
  );
};
