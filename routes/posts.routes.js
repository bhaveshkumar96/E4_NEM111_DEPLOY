const express = require("express");
const { PostsModel } = require("../models/posts.model");

const postsRouter = express.Router();

postsRouter.get("/posts", async (req, res) => {
  try {
    let token = req.headers.authorization;
    let posts = await PostsModel.find({ token });
    res.send(posts);
  } catch (error) {
    console.log(error)
  }
});

postsRouter.post("/create", async (req, res) => {
  let payload = req.body;
  try {
    let post = new PostsModel(payload);
    await post.save();
    res.send("Post created successfully");
  } catch (error) {
    res.send(error);
  }
});
postsRouter.patch("/update/:id", async (req, res) => {
  let ID = req.params.id;
  let payload = req.body;
  try {
    let post = await PostsModel.findByIdAndUpdate({ _id: ID }, payload);
    await post.save();
    res.send(`post with id ${ID} has been updated`);
  } catch (error) {}
});
postsRouter.delete("/delete/:id", async (req, res) => {
  let ID = req.params.id;
  try {
    await  PostsModel.findByIdAndDelete({ _id: ID });
    res.send(`post with id ${ID} has been deleted`);
  } catch (error) {}
});

module.exports = {
  postsRouter,
};
