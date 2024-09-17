const mongoose = require("mongoose");

const jobdescriptionSchema = new mongoose.Schema({
  usernameEmployer: {
    type: String, // Assuming your employer's username is a string
    ref: "Employers", // Reference to the Employers model
    required: true,
  },
  jobtitle: {
    type: String,
    required: true,
  },
  companyname: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  joboverview: {
    type: String,
    required: true,
  },
  responsibilities1: {
    type: String,
    required: true,
  },
  responsibilities2: {
    type: String,
    required: true,
  },
  responsibilities3: {
    type: String,
    required: true,
  },
  responsibilities4: {
    type: String,
    required: true,
  },
  responsibilities5: {
    type: String,
    required: true,
  },
  qualification1: {
    type: String,
    required: true,
  },
  qualification2: {
    type: String,
  },
  qualification3: {
    type: String,
  },
  qualification4: {
    type: String,
  },
  qualification5: {
    type: String,
  },
  employementtype: {
    type: String,
    required: true,
  },
  monthlysalary1: {
    type: Number,
    required: true,
  },
  monthlysalary2: {
    type: Number,
    required: true,
  },
  numberofvacancies: {
    type: Number,
    required: true,
  },
  degreerequired: {
    type: String,
    required: true,
  },
  categoryName: {
    type: String, // Assuming categoryName is a string
    required: true,
  },
});

const Jobdescriptions = mongoose.model("Jobdescriptions", jobdescriptionSchema);
module.exports = Jobdescriptions;
