const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema({
  contact_facebook_link: {
    type: String,
  },
  contact_pinterest_link: {
    type: String,
  },
  contact_youtube_link: {
    type: String,
  },
  contact_instagram_link: {
    type: String,
  },
});

const ContactUs123 = mongoose.model("ContactUs123", contactUsSchema);

module.exports = ContactUs123;
