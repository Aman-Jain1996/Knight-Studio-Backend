const express = require("express");
const { loginHandler, signUpHandler, resetHandler } = require("../controllers");
const router = express.Router();

router.post("/login", loginHandler);
router.post("/signup", signUpHandler);
router.post("/reset", resetHandler);

module.exports = router;
