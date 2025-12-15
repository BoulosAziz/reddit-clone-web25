//server/src/routes/postRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { checkPostOwner } from "../middleware/postMiddleware.js";
import { createPost, getPostsByCommunity, votePost, getGlobalFeed, getUserFeed, deletePost } 
from "../controllers/postController.js";
const router = express.Router();

// Create post
router.post("/", protect, createPost);

//router.post("/", protect, createPost);
router.get("/feed", getGlobalFeed);
router.get("/feed/me", protect, getUserFeed);
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
