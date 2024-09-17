const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
  image: { type: String }, // URL or path of the image
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
