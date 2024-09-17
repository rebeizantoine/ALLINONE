const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
  collection_name: {
    type: String,
    required: true,
  },
  collection_image: {
    type: String,
  },
});

module.exports = mongoose.model("Collections", collectionSchema);
