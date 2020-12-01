let { Router } = require("express");
let provider = require("./routes/provider");
let coil = require("./routes/coil");
let block = require("./routes/block");
let user = require("./routes/user");

// guaranteed to get dependencies
module.exports = () => {
  const app = Router();
  provider(app);
  block(app);
  coil(app);
  user(app);

  return app;
};
