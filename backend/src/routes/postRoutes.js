import express from "express";
import {
  addCommentToPost,
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from "../controllers/postController.js";

const router = express.Router();

// Routes for post /api/posts

router.get("/", getAllPosts);

router.get("/:id", getPost);

router.post("/", createPost);

router.put("/:id", updatePost);

router.delete("/:id", deletePost);

router.post("/:id/comment", addCommentToPost);

export default router;
