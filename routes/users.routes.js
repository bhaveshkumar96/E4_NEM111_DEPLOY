const express = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const usersRouter = express.Router();
var jwt = require("jsonwebtoken");

usersRouter.get("/", (req, res) => {
  res.send("Welcome to users page");
});

usersRouter.post("/register", async (req, res) => {
  let { name, email, gender, pass, age, city } = req.body;
  try {
    let existing_user = await UserModel.find({ email });
    if (existing_user.length > 0) {
      res.send("user already exists");
    }
    bcrypt.hash(pass, 5, async (err, hash) => {
      if (err) res.send(err);
      else {
        let user = new UserModel({
          name,
          email,
          gender,
          pass: hash,
          age,
          city,
        });
        await user.save();
        res.send({ mas: "user registered"});
      }
    });
  } catch (error) {
    res.send(error);
  }
});
usersRouter.post("/login", async (req, res) => {
  let { email, pass } = req.body;
  try {
    let user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(pass, user[0].pass, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "masai");
          res.send({ msg: "user logged in", token: token });
          res.send("Logged in successfully");
        } else {
          res.send("wrong credential", err);
        }
      });
    }
  } catch (error) {
    res.send(error);
  }
});
module.exports = {
  usersRouter,
};
