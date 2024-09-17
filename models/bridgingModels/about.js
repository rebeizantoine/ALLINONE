const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  abouttext1: {
    type: String,
  },
  aboutimg1: {
    type: String,
  },
  abouttext2: {
    type: String,
  },
  aboutimg2: {
    type: String,
  },
  aboutimg3: {
    type: String,
  },
});
const About = mongoose.model("About", aboutSchema);

module.exports = About;
