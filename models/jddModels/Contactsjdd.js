const mongoose = require("mongoose");

const contactjddSchema = new mongoose.Schema({
  contact_facebook: String,
  contact_instagram: String,
  contact_whatsapp: String,
  contact_gmail: String,
  contact_location: String,
  contact_phonenumber: String,
});

const Contactsjdd = mongoose.model("Contactsjdd", contactjddSchema);

module.exports = Contactsjdd;
