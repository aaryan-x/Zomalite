const router = require("express").Router();
const { User, Buyer, Vendor, Food, Order } = require("../mongo");

router.get("/all", async (req, res) => {
  const email = req.profileObj.email;
  const user = await User.findOne({ email });
  let orders = await Order.find({})
    .populate("buyer")
    .populate("food")
    .populate({
      path: "food",
      populate: {
        path: "vendor",
      },
    });

  if (user.type == 0) {
    orders = orders.filter((order) => {
      return order.buyer.email == email;
    });
  } else {
    orders = orders.filter((order) => {
      return order.food.vendor.email == email;
    });
  }

  orders = orders.map((order) => {
    const { __v, ...rest } = order._doc;
    return rest;
  });

  res.json(orders);
});

router.post("/add", async (req, res) => {
  const order = req.body;

  const food = await Food.findById(order.food._id);
  const buyer = await Buyer.findOne({ email: order.user.email });
  const amount = order.amount;

  if (buyer.money < amount * food.price) {
    return res.status(400).end();
  }

  const newOrder = new Order({
    status: "PLACED",
    food,
    buyer,
    amount,
  });

  buyer.money -= amount * food.price;

  await newOrder.save();
  await buyer.save();
  return res.end();
});

router.post("/updateStatus", async (req, res) => {
  const orderId = req.body.orderId;
  const order = await Order.findOne({ _id: orderId });
  order.status = req.body.status;
  order.save();
});

module.exports = router;
