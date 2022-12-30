const { User } = require("../models");

const getWatchLaterVideosHandler = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    return res.json({ watchlater: user.watchlater });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message, message: "Couldn't get watch later videos" });
  }
};

const postWatchLaterVideoHandler = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    const { video } = req.body;
    const updatedWatchLater = [...user.watchlater, video];
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { watchlater: updatedWatchLater } },
      { new: true }
    );
    return res.status(201).json({ watchlater: updatedUser.watchlater });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: "Couldn't add to watch later videos",
    });
  }
};

const removeWatchLaterVideoHandler = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    const videoId = req.params.id;

    if (!user.watchlater.find((video) => video.id === videoId))
      return res
        .status(400)
        .json({ message: "Couldn't find video in watch later videos" });

    const updatedWatchLater = user.watchlater.filter(
      (video) => video.id !== videoId
    );
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { watchlater: updatedWatchLater } },
      { new: true }
    );
    return res.json({ watchlater: updatedUser.watchlater });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: "Couldn't remove from watch later videos",
    });
  }
};

module.exports = {
  getWatchLaterVideosHandler,
  postWatchLaterVideoHandler,
  removeWatchLaterVideoHandler,
};
