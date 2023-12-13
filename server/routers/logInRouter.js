const express = require('express');
const logInRouter = express.Router();
const UserModel = require("../schema/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

logInRouter.post("/", async (req, res) => {
  const { user, pwd } = req.body;

  try {
    const foundUser = await UserModel.findOne({ user });
    if (!foundUser) {
      return res.sendStatus(401);
    }

    const isPasswordMatch = await bcrypt.compare(pwd.toString(), foundUser.pwd);
    if (!isPasswordMatch) {
      return res.sendStatus(401);
    }

    const refreshToken = jwt.sign(
      { "username": foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );
    
    foundUser.refreshToken = refreshToken;
    await foundUser.save();
    
    res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
    res.json({ userId: foundUser.id });

  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

module.exports = logInRouter;
