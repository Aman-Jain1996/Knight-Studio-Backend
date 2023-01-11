const express = require("express");
const {
  getAllVideosHandler,
  getVideoHandler,
  postVideosHandler,
} = require("../controllers");
const router = express.Router();

router.get("/", getAllVideosHandler).post("/", postVideosHandler);
router.get("/:id", getVideoHandler);

module.exports = router;
