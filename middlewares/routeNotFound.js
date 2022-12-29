const routeNotFound = (req, res, next) => {
  return res.status(404).json({ message: "Route not Found!!" });
};

module.exports = routeNotFound;
