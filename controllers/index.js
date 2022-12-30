const {
  loginHandler,
  signUpHandler,
  resetHandler,
} = require("./auth.controller");

const {
  getAllCategoryHandler,
  getCategoryHandler,
  postCategoryHandler,
} = require("./category.controller");

const {
  getVideosFromHistoryHandler,
  postVideoInHistoryHandler,
  removeVideoFromHistoryHandler,
  clearHistoryHandler,
} = require("./history.controller");

const {
  getLikedVideosHandler,
  postLikedVideoHandler,
  removeLikedVideoHandler,
} = require("./like.controller");

const {
  getAllPlaylistsHandler,
  postPlaylistHandler,
  removePlaylistHandler,
  getVideosFromPlaylistHandler,
  postVideoToPlaylistHandler,
  removeVideoFromPlaylistHandler,
} = require("./playlist.controller");

const { getAllVideosHandler, getVideoHandler } = require("./video.controller");

const {
  getWatchLaterVideosHandler,
  postWatchLaterVideoHandler,
  removeWatchLaterVideoHandler,
} = require("./watchLater.controller");

module.exports = {
  loginHandler,
  signUpHandler,
  resetHandler,
  getAllCategoryHandler,
  getCategoryHandler,
  postCategoryHandler,
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
  getAllVideosHandler,
  getVideoHandler,
  getWatchLaterVideosHandler,
  postWatchLaterVideoHandler,
  removeWatchLaterVideoHandler,
};
