const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortLink: String,
  username: String
});

module.exports = mongoose.model("Url", urlSchema);
