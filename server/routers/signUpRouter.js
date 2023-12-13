const express = require('express');
const signUpRouter = express.Router();
const UserModel = require("../schema/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

signUpRouter.post("/", async (req, res) => {
  const {user, pwd, perDescr} = req.body;
  const joinTime = new Date();
  const profilePicture = null;
  try {
    const hash = await bcrypt.hash(pwd.toString(), 10);
    const refreshToken = jwt.sign(
        {"username": user},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '1d'}
    );
    const newUser = {
      user,
      pwd: hash,
      joinTime,
      perDescr,
      refreshToken,
      profilePicture
    };
    await UserModel.create(newUser);
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000
    });
    res.send(true);
  } catch (err) {
    res.status(500).send(err);
  }
})

module.exports = signUpRouter;
