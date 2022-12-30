const { User } = require("../models");

const getAllPlaylistsHandler = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    return res.json({ playlists: user.playlists });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message, message: "Couldn't get playlists" });
  }
};

const postPlaylistHandler = async (req, res) => {
  try {
    const { userId } = req;
    const { playlist } = req.body;
    const user = await User.findById(userId);

    const newPlaylist = {
      name: playlist.name,
      videos: [],
    };
    const updatedPlaylists = [...user.playlists, newPlaylist];
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          playlists: updatedPlaylists,
        },
      },
      { new: true }
    );
    return res.json({ playlists: updatedUser.playlists });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message, message: "Couldn't add playlist" });
  }
};

const removePlaylistHandler = async (req, res) => {
  try {
    const { userId } = req;
    const playlistId = req.params.id;
    const user = await User.findById(userId);

    if (!user.playlists.find((playlist) => playlist.id === playlistId))
      return res.status(400).json({ message: "Couldn't find playlist" });

    const updatedPlaylists = user.playlists.filter(
      (playlist) => playlist.id !== playlistId
    );
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          playlists: updatedPlaylists,
        },
      },
      { new: true }
    );
    return res.json({ playlists: updatedUser.playlists });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message, message: "Couldn't remove playlist" });
  }
};

const getVideosFromPlaylistHandler = async (req, res) => {
  try {
    const { userId } = req;
    const playlistId = req.params.id;
    const user = await User.findById(userId);
    const playlist = user.playlists.find(
      (playlist) => playlist.id === playlist
    );
    return res.json({ playlist });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: "Couldn't get videos from playlist",
    });
  }
};

const postVideoToPlaylistHandler = async (req, res) => {
  try {
    const { userId } = req;
    const playlistId = req.params.id;
    const { video } = req.body;
    const user = await User.findById(userId);
    const playlist = user.playlists.find(
      (playlist) => playlist.id === playlistId
    );

    if (!playlist)
      return res.status(404).json({ message: "Couldn't find playlist" });

    playlist.videos.push(video);
    const updatedPlaylist = user.playlists.map((playlistItem) =>
      playlistItem.id === playlistId ? playlist : playlistItem
    );

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { playlists: updatedPlaylist } },
      { new: true }
    );
    return res.json({ playlists: updatedUser.playlists });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: "Couldn't add video to playlist",
    });
  }
};

const removeVideoFromPlaylistHandler = async (req, res) => {
  try {
    const { userId } = req;
    const playlistId = req.params.id;
    const videoId = req.params.videoId;
    const user = await User.findById(userId);
    const playlist = user.playlists.find(
      (playlist) => playlist.id === playlistId
    );

    if (!playlist)
      return res.status(404).json({ message: "Couldn't find playlist" });

    playlist = {
      ...playlist,
      videos: playlist.videos.filter((video) => video.id !== videoId),
    };
    const updatedPlaylists = user.playlists.map((playlistItem) =>
      playlistItem.id === playlistId ? playlist : playlistItem
    );

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { playlists: updatedPlaylists } },
      { new: true }
    );
    return res.json({ playlists: updatedUser.playlists });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: "Couldn't remove video from playlist",
    });
  }
};

module.exports = {
  getAllPlaylistsHandler,
  postPlaylistHandler,
  removePlaylistHandler,
  getVideosFromPlaylistHandler,
  postVideoToPlaylistHandler,
  removeVideoFromPlaylistHandler,
};
