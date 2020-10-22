let { Router } = require("express");
let provider = require("./routes/provider");
let coil = require("./routes/coil");
let block = require("./routes/block");

// guaranteed to get dependencies
module.exports = () => {
  const app = Router();
  provider(app);
  block(app);
  coil(app);

  return app;
};
