const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const employersSchema = new mongoose.Schema({
  firstnameEmployer: {
    type: String,
    required: true,
  },
  lastnameEmployer: {
    type: String,
    required: true,
  },
  usernameEmployer: {
    type: String,
    required: true,
  },
  passwordnameEmployer: {
    type: String,
    required: true,
  },
  locationEmployer: {
    type: String,
    required: true,
  },
  nationalityEmployer: {
    type: String,
    required: true,
  },
  phoneEmployer: {
    type: Number,
    required: true,
  },
  addressEmployer: {
    type: String,
    required: true,
  },

  genderEmployer: {
    type: String,
    required: true,
  },
  emailEmployer: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
      },
      message: "Invalid email format",
    },
  },
  role: {
    type: String,
    required: true,
  },
  postitionEmployer: {
    type: String,
  },
  companyName: {
    type: String,
  },
  companyType: {
    type: String,
  },
  companyCountry: {
    type: String,
  },
  companyPhone: {
    type: String,
  },
  companyProfile: {
    type: String,
  },
  companyNumberofemployees: {
    type: String,
  },
  companyWebsite: {
    type: String,
  },
  educationEmployer: {
    type: String,
  },
  experienceEmployer: {
    type: String,
  },
  companyrecruitingfor: {
    type: String,
  },
});
const Employer = mongoose.model("Employer", employersSchema);

module.exports = Employer;
