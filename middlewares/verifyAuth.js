const express = require("express");
const jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized access",
      });
    }

    const verifiedUser = jwt.verify(token, process.env.APP_SECRET_KEY);
    if (verifiedUser) {
      req.userId = verifiedUser.userId;
      return next();
    }
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = verifyAuth;
