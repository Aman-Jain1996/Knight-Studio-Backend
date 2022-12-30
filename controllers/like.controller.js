const { User } = require("../models");

const getLikedVideosHandler = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    return res.json({ likes: user.likes });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message, message: "Couldn't get liked videos" });
  }
};

const postLikedVideoHandler = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    const { video } = req.body;
    const updatedLikes = [...user.likes, video];
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { likes: updatedLikes } },
      { new: true }
    );
    return res.status(201).json({ likes: updatedUser.likes });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message, message: "Couldn't add to liked videos" });
  }
};

const removeLikedVideoHandler = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    const videoId = req.params.id;

    if (!user.likes.find((video) => video.id === videoId))
      return res
        .status(400)
        .json({ message: "Couldn't find video in liked videos" });

    const updatedLikes = user.likes.filter((video) => video.id !== videoId);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { likes: updatedLikes } },
      { new: true }
    );
    return res.json({ likes: updatedUser.likes });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: "Couldn't remove from liked videos",
    });
  }
};

module.exports = {
  getLikedVideosHandler,
  postLikedVideoHandler,
  removeLikedVideoHandler,
};
