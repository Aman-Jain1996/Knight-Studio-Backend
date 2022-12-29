const { Category } = require("../models");

const getAllCategoryHandler = async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.json({ categories });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message, message: "Couldn't get categories" });
  }
};

const getCategoryHandler = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    return res.json({ category });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message, message: "Couldn't get category" });
  }
};

const postCategoryHandler = async (req, res) => {
  try {
    const data = req.body;
    await Category.insertMany(data);
    const categories = await Category.find({});
    return res.status(201).json({ categories });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message, message: "Couldn't add categories" });
  }
};

module.exports = {
  getAllCategoryHandler,
  getCategoryHandler,
  postCategoryHandler,
};
