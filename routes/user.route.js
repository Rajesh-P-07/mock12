const express = require("express");
const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { authorization } = require("../middleware/auth.middleware");
require("dotenv").config();

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  let payload = req.body;

  try {
    let user = new UserModel(payload);
    await user.save();
    res.send("User registered successfully");
  } catch (err) {
    console.log(err);
    res.send("registration failed");
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await UserModel.find({ email });

    if (user.length > 0) {
      if (user[0].password == password) {
        const token = jwt.sign(
          { name: user[0].name, email: user[0].email },
          process.env.key,
          {
            algorithm: "HS512",
          }
        );
        console.log(token);
        res.send({ msg: "login successfull", token });
      } else {
        res.send("wrong password");
      }
    } else {
      res.send("user not found");
    }
  } catch (err) {
    console.log(err);
    res.send("Something went wrong");
  }
});

userRouter.use(authorization);

userRouter.get("/getProfile", (req, res) => {
  const { name, email } = req.body;
  res.send({ name, email });
});

userRouter.post("/calculate", async (req, res) => {
  const { amount, rate, years } = req.body;
  const maturity = (amount * (((1 + rate) ** years - 1) / rate)).toFixed(0);
  const totalamount = (amount * years).toFixed(0);
  const interest = (maturity - totalamount).toFixed(0);

  res.send({ maturity, totalamount, interest });
});

module.exports = { userRouter };
