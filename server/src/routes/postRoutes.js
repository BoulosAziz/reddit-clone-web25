import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createPost,
  getPostsByCommunity,
  votePost,
  deletePost
} from "../controllers/postController.js";
import { checkPostOwner } from "../middleware/postMiddleware.js";

const router = express.Router();

// Create post
router.post("/", protect, createPost);

// Get posts by community
router.get("/community/:communityId", getPostsByCommunity);

// Upvote / downvote
router.post("/:postId/vote", protect, votePost);

// Delete post
router.delete(
  "/:postId",
  protect,
  checkPostOwner,
  deletePost
);

export default router;
