let mongoose = require("mongoose");
var Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    coilUID: {
      type: String,
      required: [true, "Please enter coilUID email"],
      unique: true,
    },
    access_token: {
      type: String,
      select: false,
    },
    refresh_token: {
      type: String,
      select: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
