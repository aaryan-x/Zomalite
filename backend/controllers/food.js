const router = require("express").Router();
const { User, Buyer, Vendor, Food } = require("../mongo");
const logger = require("../utils/logger");

router.get("/all", async (req, res) => {
  let foods = await Food.find({}).populate("vendor");

  foods = foods.map((food) => {
    const { __v, ...rest } = food._doc;
    return rest;
  });

  res.json(foods);
});

router.post("/add", async (req, res) => {
  const food = req.body;
  logger.info("Food Recieved");
  logger.info(food);

  const vendor = await Vendor.findOne({ email: req.profileObj.email });

  const newFood = new Food({
    ...food,
    vendor,
  });

  await newFood.save();
  res.json({
    status: 1,
    content: "Added Food successfully",
  });
});

router.get("/getRecFoods", async (req, res) => {
  let foods = await Food.find({}).populate("vendor");
  foods = foods.filter((food) => {
    return food.vendor.email == req.profileObj.email;
  });
  res.json(foods);
});

router.post("/editFood", async (req, res) => {
  const data = req.body;

  const food = await Food.findOne({ _id: data.id });

  food.name = data.name;
  food.price = data.price;
  food.veg = data.veg;
  food.save();

  res.sendStatus(200);
});

router.post("/deleteFood", async (req, res) => {
  const data = req.body;

  const food = await Food.findOne({ _id: data.foodId });

  await food.remove();

  res.sendStatus(200);
});

module.exports = router;
