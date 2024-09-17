const mongoose = require("mongoose");

const adminbridgingSchema = new mongoose.Schema({
  adminname: {
    type: String,
    required: true,
  },
  adminpassword: {
    type: String,
    required: true,
  },
});

const Adminsbridging = mongoose.model("Adminsbridging", adminbridgingSchema);
module.exports = Adminsbridging;
