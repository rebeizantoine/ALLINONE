const mongoose = require("mongoose");

const jobseekerSchema = new mongoose.Schema({
  firstnamejobseek: {
    type: String,
    required: true,
  },
  lastnamejobseek: {
    type: String,
    required: true,
  },
  usernamejobseek: {
    type: String,
    required: true,
  },
  passwordnamejobseek: {
    type: String,
    required: true,
  },
  locationjobseek: {
    type: String,
    required: true,
  },
  nationalityjobseek: {
    type: String,
    required: true,
  },
  phonejobseek: {
    type: Number,
    required: true,
  },
  addressjobseek: {
    type: String,
    required: true,
  },
  genderjobseek: {
    type: String,
    required: true,
  },
  emailjobseek: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
      },
      message: "Invalid email format",
    },
  },
  imagejobseek: {
    type: String,
  },
  cvjobseek: {
    type: String,
  },

  uploadedcv: {
    type: String,
  },
  educationjobseek: {
    type: String,
  },
  experiencejobseek: {
    type: String,
  },
});

const Jobseekers = mongoose.model("Jobseekers", jobseekerSchema);
module.exports = Jobseekers;
