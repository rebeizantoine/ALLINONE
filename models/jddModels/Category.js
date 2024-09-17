const mongoose = require("mongoose");

const categoryjddSchema = new mongoose.Schema({
  category_name: {
    type: String,
  },
  category_image: {
    type: String,
  },
});

module.exports = mongoose.model("Categoriesjdd", categoryjddSchema);
