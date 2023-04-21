const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  price: Number,
  veg: Boolean,
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
});

foodSchema.plugin(uniqueValidator);

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
