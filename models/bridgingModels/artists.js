const mongoose = require("mongoose");

const artistsSchema = new mongoose.Schema({
  artist_name: {
    type: String,
    required: true,
  },
  artist_lastname: {
    type: String,
    required: true,
  },
  artist_aka: {
    type: String,
  },
  artist_arttype: {
    type: String,
    required: true,
  },
  artist_image: {
    type: String,
  },
  artist_country: {
    type: String,
    required: true,
  },
  artist_city: {
    type: String,
    required: true,
  },
  artist_about: {
    type: String,
  },
  artist_work1: {
    type: String,
  },
  artist_work1name: {
    type: String,
  },
  artist_work1des: {
    type: String,
  },
  artist_work2name: {
    type: String,
  },
  artist_work2: {
    type: String,
  },
  artist_work2des: {
    type: String,
  },
  artist_work3name: {
    type: String,
  },
  artist_work3: {
    type: String,
  },
  artist_work3des: {
    type: String,
  },
  artist_work4: {
    type: String,
  },
  artist_work4des: {
    type: String,
  },
  artist_pdf: {
    type: String,
  },
  featured_on_front: {
    type: Boolean,
    default: false,
  },
  artist_pitch: { type: String },
});

module.exports = mongoose.model("Artists", artistsSchema);
