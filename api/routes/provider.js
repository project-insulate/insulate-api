let { Router } = require("express");
let { celebrate, Joi } = require("celebrate");
const route = Router();

let { create } = require("../../controllers/provider");

module.exports = (app) => {
  app.use("/provider", route);

  route.post(
    "/",
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
      }),
    }),
    [create]
  );
};
