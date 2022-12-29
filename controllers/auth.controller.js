const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "No user registered with this email" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials!" });
    }

    const jwtToken = jwt.sign(
      { userId: user._id },
      process.env.APP_SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );

    const userDataToSend = { ...user._doc };
    delete userDataToSend.password;

    return res.json({
      message: "Login successful",
      user: { ...userDataToSend, token: jwtToken },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message, message: "Login failed" });
  }
};

const signUpHandler = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findOne({ email: data.email });

    if (user) {
      return res
        .status(409)
        .json({ message: "User already exists with this email" });
    }

    const encryptedPassword = await bcrypt.hash(data.password, 15);
    const newUser = {
      ...data,
      password: encryptedPassword,
      likes: [],
      watchlater: [],
      history: [],
      playlists: [],
    };

    await newUser.save();

    const jwtToken = jwt.sign(
      { userId: newUser._id },
      process.env.APP_SECRET_KEY,
      { expiresIn: "24h" }
    );

    const userDataToSend = { ...newUser._doc };
    delete userDataToSend.password;

    return res.status(201).json({
      message: "Signup successful",
      user: { ...userDataToSend, token: jwtToken },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message, message: "Signup failed" });
  }
};

const resetHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "No user registered with this email" });
    }

    if (user.isAdmin) {
      return res
        .status(400)
        .json({ message: "Guest user password can't be changed" });
    }

    const encryptedPassword = await bcrypt.hash(password, 15);

    await User.findByIdAndUpdate(
      user._id,
      {
        $set: { password: encryptedPassword },
      },
      { new: true }
    );

    return res.json({ message: "Password changed successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message, message: "Password reset failed" });
  }
};

module.exports = {
  loginHandler,
  signUpHandler,
  resetHandler,
};
