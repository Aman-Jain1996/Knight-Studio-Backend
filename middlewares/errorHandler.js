const chalk = require("chalk");

const errorHandler = (err, req, res, next) => {
  console.log("Error occured at:", Date.now().toString(), err.message);
  console.log(
    "Error in : " +
      chalk.bgYellow.bold(req.method) +
      " request for route : " +
      chalk.bgYellow.bold(req.url)
  );
  return res.status(500).json({ success: false, message: err.message });
};

module.exports = errorHandler;
