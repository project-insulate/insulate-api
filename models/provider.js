let mongoose = require("mongoose");
var Schema = mongoose.Schema;

const ProviderSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter provider's email"],
      unique: true,
    },
    client_id: {
      type: String,
      required: [true, "Please generate a client_id"],
      unique: true,
    },
    client_secret: {
      type: String,
      required: [true, "Please generate a client_id"],
      unique: true,
      select: false,
    },
  },
  { timestamps: true }
);

const Provider = mongoose.model("Provider", ProviderSchema);
module.exports = Provider;
