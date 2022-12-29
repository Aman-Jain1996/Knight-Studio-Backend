const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema(
  {
    title: String,
    description: String,
    creator: String,
    imageURL: String,
    categories: [String],
  },
  { timestamps: true }
);

const playlistSchema = new Schema(
  {
    name: String,
    videos: [videoSchema],
  },
  { timestamps: true }
);

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    isAdmin: { type: Boolean, default: false },
    playlists: [playlistSchema],
    history: [videoSchema],
    watchlater: [videoSchema],
    likes: [videoSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
