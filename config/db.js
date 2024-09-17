const mongoose = require("mongoose");
const MONGODB_URL = process.env.MONGODB_URL;

async function dbConnection() {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("connected successfully senpai");
  } catch (error) {
    console.log("did not work connecting to database,", error);
  }
}

module.exports = dbConnection;
