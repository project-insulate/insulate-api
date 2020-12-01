let mongoose = require("mongoose");
var Schema = mongoose.Schema;

const BlockSchema = new mongoose.Schema(
  {
    hash: {
      type: String
    },
    start_time: {
      type: Date,
    },
    end_time: {
      type: Date,
    },
    visited: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Block = mongoose.model("Block", BlockSchema);
module.exports = Block;
