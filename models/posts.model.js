const mongoose = require("mongoose");

const postsSchema = mongoose.Schema({
  title: String,
  body: String,
  device: String,
  no_of_comments : Number,
  user:String
});

const PostsModel = mongoose.model("post", postsSchema);

module.exports = {
  PostsModel,
};
