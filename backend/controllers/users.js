const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const { User, Buyer, Vendor } = require("../mongo");
const { SECRET } = require("../utils/config");

router.post("/register", async (req, res) => {
  const body = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    email: body.email,
    type: body.type,
    passwordHash,
  });

  let profile;
  if (body.type === 0) {
    profile = new Buyer({
      email: body.email,
      name: body.name,
      contact: body.contact,
      age: body.age,
      batch: body.batch,
    });
  } else {
    profile = new Vendor({
      email: body.email,
      shop: body.shop,
      name: body.name,
      contact: body.contact,
    });
  }

  await user.save();
  await profile.save();
  res.sendStatus(201).end();
});

router.post("/login", async (req, res) => {
  const body = req.body;

  const user = await User.findOne({ email: body.email });
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(200).json({
      status: 1,
      error: "Invalid Email or Password",
    });
  }

  const userForToken = {
    email: user.email,
    id: user._id,
  };

  const token = jwt.sign(userForToken, SECRET);

  res.status(200).json({ token, status: 0, email: user.email });
});

module.exports = router;
