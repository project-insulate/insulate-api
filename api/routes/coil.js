let { Router } = require("express");
const route = Router();

let { redirect } = require("../../controllers/coil");

module.exports = (app) => {
  app.use("/coil", route);

  route.get("/redirect", [redirect]);
};
