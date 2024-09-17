const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const purchasedSchema = new Schema({
  purchased_firstname: {
    type: String,
    // required: true,
  },
  purchased_lastname: {
    type: String,
    // required: true,
  },
  purchased_email: {
    type: String,
    // required: true,
  },
  purchased_phonenumber1: {
    type: String,
    // required: true,
  },
  purchased_phonenumber2: {
    type: String,
  },
  purchased_deliveryoption: {
    type: String,
    // required: true,
  },
  purchased_location: {
    type: String,
    // required: true,
  },
  purchased_additionaldetails: {
    type: String,
  },
  purchased_item1name: {
    type: String,
    // required: true,
  },
  purchased_item1price: {
    type: Number, // Corrected to Number if it represents a price
    // required: true,
  },
  purchased_item2name: {
    type: String,
  },
  purchased_item2price: {
    type: Number, // Corrected to Number if it represents a price
  },
  purchased_item3name: {
    type: String,
  },
  purchased_item3price: {
    type: Number, // Corrected to Number if it represents a price
  },
  purchased_item4name: {
    type: String,
  },
  purchased_item4price: {
    type: Number, // Corrected to Number if it represents a price
  },
  purchased_subtotal: {
    type: Number,
    // required: true,
  },
  purchased_date: {
    type: Date,
    default: Date.now,
  },
});

const Purchased = mongoose.model("Purchased", purchasedSchema);

module.exports = Purchased;
