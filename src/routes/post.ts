import express, { query, Request, Response } from "express";
import BlogModel from "../models/Blog";

const postsRoute = express.Router();

postsRoute.get("/", async (req: Request, res: Response) => {
  try {
    // Get post by tag
    if (req.query?.tag) {
      const posts = await BlogModel.find({ tags: req.query.tag });
      res.json(posts);
      return;
    }
    // Get all post
    const posts = await BlogModel.find();
    res.json(posts);
    return;
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

postsRoute.get("/recent", async (req: Request, res: Response) => {
  try {
    const posts = (await BlogModel.find()).slice(-5);
    res.json(posts);
    return;
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// Get post by id
postsRoute.get("/:id", async (req: Request, res: Response) => {
  try {
    const post = await BlogModel.findById({ _id: req.params.id });
    res.json(post);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

postsRoute.post("/", async (req: Request, res: Response) => {
  try {
    const blog = new BlogModel(req.body);
    await blog.save();
    res.json({ message: "Success!" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

export default postsRoute;
