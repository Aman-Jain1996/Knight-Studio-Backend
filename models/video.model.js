const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  _id: String,
  title: String,
  description: String,
  creator: String,
  imageURL: String,
  categories: [String],
});

module.exports = mongoose.model("Video", videoSchema);
