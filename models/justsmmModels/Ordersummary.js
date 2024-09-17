const mongoose = require("mongoose");

const orderSummarySchemaLawa = new mongoose.Schema(
  {
    orderla_firstname: { type: String },
    orderla_lastname: { type: String },
    orderla_email:{type:String},
    orderla_servicename1: { type: String },
    orderla_quantity1: { type: Number },
    orderla_servicename2: { type: String },
    orderla_quantity2: { type: Number },
    orderla_paymentoption: { type: String },
    orderla_totaltopay: { type: String },
    orderla_additionalcomment:{type:String},
  },
  { timestamps: true }
);

const OrderSummary = mongoose.model("OrderSummaryLawa", orderSummarySchemaLawa);
module.exports = OrderSummary;
