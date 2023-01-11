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
    if (!video) {
      return res.status(404).json({ message: "Couldn't find video" });
    }
    return res.json({ video });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message, message: "Couldn't get video" });
  }
};

const postVideosHandler = async (req, res) => {
  try {
    const data = req.body;
    await Video.insertMany(data);
    const videos = await Video.find({});
    return res.status(201).json({ videos });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message, message: "Couldn't post videos" });
  }
};
module.exports = { getAllVideosHandler, getVideoHandler, postVideosHandler };
