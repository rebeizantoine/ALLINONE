const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema({
  gallery_name: {
    type: String,
  },
  gallery_date: {
    type: String,
  },
  gallery_country: {
    type: String,
  },
  gallery_city: {
    type: String,
  },
  gallery_host: {
    type: String,
  },
  gallery_description: {
    type: String,
  },
  gallery_image: {
    type: String,
  },
  gallery_featured_artists1: {
    type: String,
  },
  gallery_featured_artists2: {
    type: String,
  },
  gallery_featured_artists3: {
    type: String,
  },
});

const FeaturedGallery = mongoose.model("FeaturedGallery", GallerySchema);

module.exports = FeaturedGallery;
