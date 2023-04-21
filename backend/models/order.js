const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  status: String,
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "Buyer" },
  food: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
  amount: Number,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
