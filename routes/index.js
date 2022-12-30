const express = require("express");
const { verifyAuth } = require("../middlewares");
const router = express.Router();
const authRouter = require("./auth.router");
const categoryRouter = require("./category.router");
const userRouter = require("./user.router");
const videoRouter = require("./video.router");

router.use("/auth", authRouter);
router.use("/category", categoryRouter);
router.use("/video", videoRouter);
router.use("/user", verifyAuth, userRouter);

module.exports = router;
