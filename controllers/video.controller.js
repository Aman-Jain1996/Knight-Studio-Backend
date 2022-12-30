const { Video } = require("../models");

const getAllVideosHandler = async (req, res) => {
  try {
    const videos = await Video.find();
    return res.json({ videos });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message, message: "Couldn't get videos" });
  }
};

const getVideoHandler = async (req, res) => {
  try {
    const videoId = req.params.id;
    const video = await Video.findById(videoId);
    return res.json({ video });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message, message: "Couldn't get video" });
  }
};

module.exports = { getAllVideosHandler, getVideoHandler };
