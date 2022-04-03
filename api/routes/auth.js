const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const { Router } = require("express");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt( //Encripta la pass en la bd
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });

  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("Wrong password or username!");

    //Decript password
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    var originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password &&
      res.status(401).json("Wrong password or username!");

      //JSON WEB TOKEN
      const accesToken = jwt.sign(
        {id: user._id, isAdmin: user.isAdmin},
        process.env.SECRET_KEY,
        {expiresIn:"5d"}
      )

      //guarda en info todo, menos la password
      const {password, ...info} = user._doc;

    res.status(200).json({...info, accesToken});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

