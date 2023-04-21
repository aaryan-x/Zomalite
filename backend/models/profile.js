const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const buyerSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  name: String,
  contact: String,
  age: Number,
  batch: String,
  money: {
    type: Number,
    default: 0,
  },
});

const vendorSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  shop: {
    type: String,
    unique: true,
  },
  name: String,
  contact: String,
});

buyerSchema.plugin(uniqueValidator);
vendorSchema.plugin(uniqueValidator);

const Buyer = mongoose.model("Buyer", buyerSchema);
const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = { Buyer, Vendor };
