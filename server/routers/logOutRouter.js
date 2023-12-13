const express = require('express');
const logOutRouter = express.Router();
const UserModel = require("../schema/User");
const verifyJWT = require("../middleware/verifyJWT");

logOutRouter.put("/", async (req, res) => {

  await verifyJWT(req, res, async (foundUser) => {
    foundUser.refreshToken = "";
    await foundUser.save();
    res.clearCookie("jwt", {httpOnly: true, sameSite: "None", secure: true});
    return res.sendStatus(204);
  });

})

module.exports = logOutRouter;
