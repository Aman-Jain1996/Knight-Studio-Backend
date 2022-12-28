const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;
const dbName = process.env.DB_NAME;
const app = express();

// Middleware at Application level
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to Knight-Studio Backend");
});

mongoose.set("strictQuery", false);
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Started , Listening on port ${process.env.PORT}`);
      console.log("Connected to database successfully!");
    });
  })
  .catch((err) => console.log("Error in connecting to DB", err));
