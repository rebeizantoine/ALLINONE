const mongoose = require("mongoose");

const adminjddSchema = new mongoose.Schema({
  adminname: {
    type: String,
    required: true,
  },
  adminpassword: {
    type: String,
    required: true,
  },
});
const Adminsjdd = mongoose.model("Adminsjdd", adminjddSchema);
module.exports = Adminsjdd;
