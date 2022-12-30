const express = require("express");
const { getAllVideosHandler, getVideoHandler } = require("../controllers");
const router = express.Router();

router.get("/", getAllVideosHandler);
router.post("/:id", getVideoHandler);

module.exports = router;
