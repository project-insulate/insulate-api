let { Router } = require("express");
let { celebrate, Joi } = require("celebrate");
const route = Router();

let { create, webhook } = require("../../controllers/block");

module.exports = (app) => {
  app.use("/block", route);

  // TODO: fix celebrate body
  route.post(
    "/",
    // celebrate({
    //   body: Joi.object({
    //     coilId: Joi.string().required(),
    //     provider: Joi.string().required(),
    //     clientId: Joi.string().required(),
    //   }),
    // }),
    [create]
  );
};
