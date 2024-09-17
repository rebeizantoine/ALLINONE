const mongoose = require("mongoose");

const jobPostSchema = new mongoose.Schema(
  {
    usernameEmployer: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    companyposition: {
      type: String,
    },
    locationposition: {
      type: String,
      required: true,
    },
    datepostition: {
      type: String,
      required: true,
    },
    joboverviewposition: {
      type: String,
      required: true,
    },
    responsibility1: {
      type: String,
      required: true,
    },
    responsibility2: {
      type: String,
      required: true,
    },
    responsibility3: {
      type: String,
    },
    responsibility4: {
      type: String,
    },
    responsibility5: {
      type: String,
    },
    qualification1: {
      type: String,
      required: true,
    },
    qualification2: {
      type: String,
      required: true,
    },
    qualification3: {
      type: String,
    },
    qualification4: {
      type: String,
    },
    employementtype: {
      type: String,
      required: true,
    },
    salaryrange1: {
      type: Number,
      required: true,
    },
    salaryrange2: {
      type: Number,
      required: true,
    },
    numberofvacancies: {
      type: Number,
      required: true,
    },
    degreeneeded: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Add this option for timestamps
  }
);

const JobPost = mongoose.model("JobPost", jobPostSchema);
module.exports = JobPost;
