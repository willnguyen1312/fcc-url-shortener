const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
  shortNum: String,
  _id: String
});

module.exports = mongoose.model("Url", urlSchema);
