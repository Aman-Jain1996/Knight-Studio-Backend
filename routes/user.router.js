const express = require("express");
const {
  getVideosFromHistoryHandler,
  postVideoInHistoryHandler,
  removeVideoFromHistoryHandler,
  clearHistoryHandler,
  getLikedVideosHandler,
  postLikedVideoHandler,
  removeLikedVideoHandler,
  getAllPlaylistsHandler,
  postPlaylistHandler,
  removePlaylistHandler,
  getVideosFromPlaylistHandler,
  postVideoToPlaylistHandler,
  removeVideoFromPlaylistHandler,
  getWatchLaterVideosHandler,
  postWatchLaterVideoHandler,
  removeWatchLaterVideoHandler,
} = require("../controllers");
const router = express.Router();

// history routes
router
  .route("/history")
  .get(getVideosFromHistoryHandler)
  .post(postVideoInHistoryHandler);
router.delete("/history/clear", clearHistoryHandler);
router.delete("/history/:id", removeVideoFromHistoryHandler);

// like's routes
router.route("/likes").get(getLikedVideosHandler).post(postLikedVideoHandler);
router.delete("/likes/:id", removeLikedVideoHandler);

// playlist routes
router
  .route("/playlists")
  .get(getAllPlaylistsHandler)
  .post(postPlaylistHandler);
router
  .route("/playlists/:id")
  .get(getVideosFromPlaylistHandler)
  .post(postVideoToPlaylistHandler)
  .delete(removePlaylistHandler);
router.delete("/playlists/:id/:videoId", removeVideoFromPlaylistHandler);

// watch later routes
router
  .route("/watchlater")
  .get(getWatchLaterVideosHandler)
  .post(postWatchLaterVideoHandler);
router.delete("/watchlater/:id", removeWatchLaterVideoHandler);

module.exports = router;
