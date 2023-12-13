const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
  postContent: String,
  postTime: Date,
  postedBy: String,
  image: String
}, {collection: "posts"}, { strict: false })

module.exports = mongoose.model("Post", postSchema);
