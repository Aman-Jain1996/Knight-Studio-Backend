const express = require("express");
const {
  getAllCategoryHandler,
  getCategoryHandler,
  postCategoryHandler,
} = require("../controllers");
const router = express.Router();

router.route("/").get(getAllCategoryHandler).post(postCategoryHandler);
router.get("/:id", getCategoryHandler);

module.exports = router;
