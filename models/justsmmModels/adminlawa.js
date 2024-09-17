const mongoose = require("mongoose");

const adminlawa = new mongoose.Schema({
  adminla_username: {
    type: String,
  },
  adminla_password: {
    type: String,
  },
});

const Adminlawa = mongoose.model("Adminlawa", adminlawa);
module.exports = Adminlawa;
