const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user: {type: String, unique: true, required: true},
  pwd: {type: String, required: true},
  joinTime: Date,
  perDescr: String,
  posts: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"posts",
  },
  refreshToken: String,
  profilePicture: String
}, {collection: "users"}, { strict: false })

module.exports = mongoose.model("User", userSchema);
