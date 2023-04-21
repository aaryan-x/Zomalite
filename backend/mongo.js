const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");

const User = require("./models/user");
const { Buyer, Vendor } = require("./models/profile");
const Food = require("./models/food");
const Order = require("./models/order");

mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((_) => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error(error);
  });

const closeCon = () => {
  mongoose.connection.close();
};

module.exports = {
  User,
  Buyer,
  Vendor,
  Food,
  Order,
  closeCon,
};
