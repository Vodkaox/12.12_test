const express = require('express');
const userRouter = express.Router();
const UserModel = require("../schema/User");

userRouter.get("/", async (req, res) => {
  const { jwt: refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.sendStatus(204);
  }
  const foundUser = await UserModel.findOne({ refreshToken });
  if (!foundUser) return res.sendStatus(404);
  res.json({ user: foundUser.user, joinTime: foundUser.joinTime, perDescr: foundUser.perDescr });
})

userRouter.get("/findByName/:userName", async (req, res) => {
  const { userName } = req.params;
  const foundUser = await UserModel.findOne({ user: userName });
  if (!foundUser) {
    return res.sendStatus(404);
  }
  res.json({ user: foundUser.user, joinTime: foundUser.joinTime, perDescr: foundUser.perDescr });
})

userRouter.get("/all", async (req, res) => {
  const foundUsers = await UserModel.find();
  const resUsers = foundUsers.map(user => ({
    user: user.user,
    joinTime: user.joinTime,
    perDescr: user.perDescr
  }));
  res.json(resUsers);
})

userRouter.get("/search/:string", async (req, res) => {
  const searchString = req.params.string.toLowerCase();
  const allUsers = await UserModel.find();
  const foundUsers = allUsers.filter(user => 
    user.user.toLowerCase().includes(searchString)
  ).map(user => user.user);
  res.json(foundUsers);
})

userRouter.put("/updateProfileDescription/:username", async (req, res) => {
  const { jwt: refreshToken } = req.cookies;
  if (!refreshToken) return res.sendStatus(401);

  const { username } = req.params;
  const loggedInUser = await UserModel.findOne({ refreshToken });
  if (loggedInUser.user !== username) return res.sendStatus(403);

  await UserModel.findOneAndUpdate({ user: username }, 
    { $set: { perDescr: req.body.description }}, 
    { new: true }
  );
  res.send('Description has been updated');
})

userRouter.put('/pictureUpload/:username', async (req, res) => {
  const cookies = req.cookies;
  if (cookies.jwt) {
    profile_username = req.params.username;
    const loggedin = await UserModel.findOne({refreshToken: cookies.jwt});
    if (loggedin.user == profile_username) {
      const updated = await UserModel.findOneAndUpdate({user: profile_username}, 
                                       {$set: {profilePicture: req.body.image
                                      }}, {returnNewDocument: true,
                                        new: true,
                                        strict: false});
      res.send('profile has been uploaded successfully');                            
    }
    else {
      res.status(500).send('not allowed');
    }
  }
})

userRouter.get('/pictureUpload/:username', async (req, res) => {
  profile_username = req.params.username;
  const user = await UserModel.findOne({user: profile_username});
  res.send(user);
})

module.exports = userRouter;
