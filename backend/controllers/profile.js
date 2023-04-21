const router = require("express").Router();
const { User, Buyer, Vendor } = require("../mongo");

router.get("/init", async (req, res) => {
  const user = await User.findOne({ email: req.profileObj.email });
  res.json({
    email: user.email,
    type: user.type,
    _id: user._id,
  });
});

router.get("/details", async (req, res) => {
  const user = await User.findOne({ email: req.profileObj.email });
  let details = {};

  if (user.type === 0) {
    details = await Buyer.findOne({ email: req.profileObj.email });
  } else {
    details = await Vendor.findOne({ email: req.profileObj.email });
  }

  const { passwordHash, _id, __v, ...rest } = {
    ...user._doc,
    ...details._doc,
  };

  res.json({
    ...rest,
  });
});

router.post("/update", async (req, res) => {
  const newProfile = req.body;
  const user = await User.findOne({ email: req.profileObj.email });

  if (newProfile.email !== req.profileObj.email) {
    return res.json({
      status: 1,
      error: "Emails don't match",
    });
  }

  if (user.type === 0) {
    await Buyer.updateOne(
      { email: req.profileObj.email },
      {
        money: newProfile.money,
        name: newProfile.name,
        contact: newProfile.contact,
        age: newProfile.age,
        batch: newProfile.batch,
      }
    );
  } else {
    await Vendor.updateOne(
      { email: req.profileObj.email },
      {
        shop: newProfile.shop,
        name: newProfile.name,
        contact: newProfile.contact,
      }
    );
  }

  res.json({
    status: 0,
    content: "Profile Edited Succesfully",
  });
});

module.exports = router;
