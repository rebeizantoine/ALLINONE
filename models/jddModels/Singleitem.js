const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  item_name: {
    type: String,
  },
  item_price: {
    type: Number,
  },
  item_color1: {
    type: String,
  },
  item_color2: {
    type: String,
  },
  item_quantityAvailable: {
    type: Number,
  },
  item_dimensions: {
    type: String,
  },
  item_customizable: {
    type: Boolean,
  },
  item_image1: {
    type: String,
  },
  item_image2: {
    type: String,
  },
  item_image3: {
    type: String,
  },
  item_description: {
    type: String,
  },
  item_featuredOnFront: {
    type: Boolean,
  },
  item_maylike: {
    type: Boolean,
    default: false,
  },
  item_mainTag: {
    type: String,
  },
  item_additionalTag1: {
    type: String,
  },
  item_additionalTag2: {
    type: String,
  },
  item_additionalTag3: {
    type: String,
  },
});

module.exports = mongoose.model("Items", itemSchema);
