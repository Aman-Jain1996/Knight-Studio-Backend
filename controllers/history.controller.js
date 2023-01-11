const { User } = require("../models");

const getVideosFromHistoryHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    return res.json({ history: user.history });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message, message: "Couldn't get user watch history" });
  }
};

const postVideoInHistoryHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const { video } = req.body;

    if (user.history.find((vid) => vid.id === video._id))
      return res.status(409).json({
        message: "Video already in history",
      });

    const updatedHistory = [...user.history, video];

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: { history: updatedHistory },
      },
      { new: true }
    );
    return res.status(201).json({ history: updatedUser.history });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: "Couldn't add video to user watch history",
    });
  }
};

const removeVideoFromHistoryHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const videoId = req.params.id;

    if (!user.history.find((video) => video.id === videoId))
      return res
        .status(400)
        .json({ message: "Couldn't find video in user watch history" });

    const updatedHistory = user.history.filter((video) => video.id !== videoId);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: { history: updatedHistory },
      },
      { new: true }
    );
    return res.status(201).json({ history: updatedUser.history });
  } catch (err) {}
};

const clearHistoryHandler = async (req, res) => {
  try {
    const userId = req.userId;
    await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          history: [],
        },
      },
      { new: true }
    );
    return res.json({ history: [] });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: "Couldn't clear user watch history",
    });
  }
};

module.exports = {
  getVideosFromHistoryHandler,
  postVideoInHistoryHandler,
  removeVideoFromHistoryHandler,
  clearHistoryHandler,
};
