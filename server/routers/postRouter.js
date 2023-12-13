const PostModel = require("../schema/Post");
const UserModel = require("../schema/User");
const express = require("express");
const verifyJWT = require("../middleware/verifyJWT");
const postRouter = express.Router();

postRouter.post("/new-post", async (req, res) => {
  const postContent = req.body.postContent;
  const postTime = new Date();
  try {
    await verifyJWT(req, res, async (foundUser) => {
      const newPost = {
        postContent,
        postTime,
        postedBy: foundUser.user,
      };
      const dbRes = await PostModel.create(newPost);
      res.send(dbRes);
    });
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

postRouter.get("/", async (req, res) => {
  try {
    const dbResponse = await PostModel.find({});
    res.send(dbResponse);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

postRouter.get("/:userName", async (req, res) => {
  try {
    const dbResponse = await PostModel.find({ postedBy: req.params.userName });
    res.send(dbResponse);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

postRouter.delete('/:postId', async (req, res) => {
  const cookies = req.cookies;
  
  if (cookies.jwt){
    const foundUser = await UserModel.findOne({refreshToken: cookies.jwt});

    const post = await PostModel.findById(req.params.postId);
    if (post.postedBy == foundUser.user) {
      await post.deleteOne();
      res.status(200).send('post has been deleted');
    }
    else {
      res.status(500).send('post not deleted')
    }
  }
})

postRouter.put('/:postId', async function (req, res) {
  const cookies = req.cookies;
  const postContent = req.body.postContent;

  const mongoose = require('mongoose');
  const ObjectId = mongoose.Types.ObjectId;
  const id = new ObjectId(req.params.postId);

  if (cookies.jwt){
    const foundUser = await UserModel.findOne({refreshToken: cookies.jwt});
    const post = await PostModel.findById(id);
    if (post.postedBy == foundUser.user) {
      await PostModel.findOneAndUpdate({_id: new mongoose.Types.ObjectId(id)}, 
                                       {$set: {postContent: req.body.postContent,
                                        postTime: new Date()}}, {new: true});
      res.status(200).send('post has been updated');
    }
    else {
      res.status(500).send('post update failed');
     }
  }
})

module.exports = postRouter;
