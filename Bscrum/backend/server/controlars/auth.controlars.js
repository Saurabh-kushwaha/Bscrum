require("dotenv").config();
const express = require("express");
const User = require("../models/user.models");
const jwt = require("jsonwebtoken");
const router = express.Router();

const newToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SCERECT_KEY)
}

router.post("/signup", async (req, res) => {
    try{
        let user = await User.exists({ email: req.body.email })
        if (user)
        return res.status(400).json("user exists try anoter email");
        user = await User.create(req.body);
        let token = newToken(user);
        res.status(200).json({ token });
    } catch (e) {
        return res.status(500).json({status: "failed" , message: e.message})
    }
});

router.post("/login", async (req, res) => {
  try {
    // 1. does user exists
    let user = await User.findOne({ email: req.body.email });
    // 2. if does not then return 400
    if (!user) {
      return res.status(400).json("User email or password is incorrect");
    }
    // 3. if exists then check if password is matching
    const matching = user.checkPassword(req.body.password);
    // 4. if not matching then throw 400
    if (!matching) {
      return res.status(400).json("User email or password is incorrect");
    }
    // 5. if matching then give him the token
    let token = newToken(user);
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ status: "failed", message: err.message });
  }
});

module.exports = router;
