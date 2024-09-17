const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  HomeStreetAddress: {
    type: String,
    required: true,
  },
  CityState: {
    type: String,
    required: true,
  },
  emailcv: {
    type: String,
    required: true,
  },
  phonenumbercv: {
    type: String,
    required: true,
  },
  organizationcv: {
    type: String,
    required: true,
  },
  organizationcvanswer: {
    type: String,
    required: true,
  },
  positiontitlecv: {
    type: String,
    required: true,
  },
  positiontitlecvanswer: {
    type: String,
    required: true,
  },
  explination1: {
    type: String,
    required: true,
  },
  explination2: {
    type: String,
  },
  explination3: {
    type: String,
  },
  organizationcv2: {
    type: String,
  },
  organizationcvanswer2: {
    type: String,
  },
  positiontitlecv2: {
    type: String,
  },
  positiontitlecvanswer2: {
    type: String,
  },
  explination12: {
    type: String,
  },
  explination22: {
    type: String,
  },
  explination32: {
    type: String,
  },

  educationlocationcv: {
    type: String,
    required: true,
  },
  answereducationlocationcv: {
    type: String,
    required: true,
  },
  degreecv: {
    type: String,
    required: true,
  },
  degreecvanswer: {
    type: String,
    required: true,
  },
  educationlocationcv2: {
    type: String,
    required: true,
  },
  answereducationlocationcv2: {
    type: String,
    required: true,
  },
  degreecv2: {
    type: String,
    required: true,
  },
  degreecvanswer2: {
    type: String,
    required: true,
  },
  skillcv1: {
    type: String,
    required: true,
  },
  skillcv2: {
    type: String,
    required: true,
  },
  skillcv3: {
    type: String,
    required: true,
  },
  skillcv4: {
    type: String,
    required: true,
  },
  skillcv5: {
    type: String,
    required: true,
  },
  skillcv6: {
    type: String,
    required: true,
  },
  skillcv7: {
    type: String,
    required: true,
  },
  skillcv8: {
    type: String,
    required: true,
  },
  skillcv9: {
    type: String,
    required: true,
  },
  skillcv10: {
    type: String,
    required: true,
  },
  skillcv11: {
    type: String,
    required: true,
  },
  skillcv12: {
    type: String,
    required: true,
  },
});

const CV = mongoose.model("CV", cvSchema);

module.exports = CV;
