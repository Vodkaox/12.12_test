const UserModel = require("../schema/User");
require('dotenv').config();

const verifyJWT = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(204);
  }
  const refreshToken = cookies.jwt;
  const foundUser = await UserModel.findOne({refreshToken});
  if (!foundUser) {
    res.clearCookie("jwt", {httpOnly: true, sameSite: "None", secure: true});
    return res.sendStatus(204);
  }
  next(foundUser);
}

module.exports = verifyJWT