const mongoose = require("mongoose");

const FeaturedPaintingsSchema = new mongoose.Schema({
  feature_artist_name: {
    type: String,
    required: true,
  },
  feature_artist_last_name: {
    type: String,
    required: true,
  },
  feature_genre: {
    type: String,
    required: true,
  },
  feature_name_of_painting: {
    type: String,
    required: true,
  },
  feature_image_of_painting: {
    type: String,
    required: true,
  },
  feature_description_of_painting: {
    type: String,
    required: true,
  },
  feature_tag1: {
    type: String,
  },
  feature_tag2: {
    type: String,
  },
  feature_tag3: {
    type: String,
  },
  feature_created_on: {
    type: Date,
    default: Date.now,
  },
  feature_year_of_painting: {
    type: String,
  },
});

const FeaturedP = mongoose.model("FeaturedP", FeaturedPaintingsSchema);

module.exports = FeaturedP;
