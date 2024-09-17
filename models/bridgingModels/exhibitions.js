const mongoose = require("mongoose");

const ExhibitionsSchema = new mongoose.Schema({
  exhibition_name: {
    type: String,
  },
  exhibition_description: {
    type: String,
  },
  exhibition_country: {
    type: String,
  },
  exhibition_city: {
    type: String,
  },
  exhibition_featured1name: {
    type: String,
  },
  exhibition_featured1image: {
    type: String,
  },
  exhibition_featured2name: {
    type: String,
  },
  exhibition_featured2image: {
    type: String,
  },
  exhibition_featured3name: {
    type: String,
  },
  exhibition_featured3image: {
    type: String,
  },
  exhibition_opening_hours: {
    type: String,
  },
  exhibition_closing_hours: {
    type: String,
  },
  exhibition_month: {
    type: String,
  },
  exhibition_day: {
    type: String,
  },
});
const Exhibition = mongoose.model("Exhibition", ExhibitionsSchema);

module.exports = Exhibition;
