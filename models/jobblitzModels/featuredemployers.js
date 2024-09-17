const mongoose = require("mongoose");

const featuredEmployerSchema = new mongoose.Schema({
  employerName: {
    type: String,
  },
  employerImage: {
    type: String,
  },
});

const FeaturedEmployer = mongoose.model(
  "FeaturedEmployer",
  featuredEmployerSchema
);

module.exports = FeaturedEmployer;
