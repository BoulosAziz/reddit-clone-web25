//server/src/routes/postRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { checkPostOwner } from "../middleware/postMiddleware.js";
import { createPost, getPostsByCommunity, votePost, getGlobalFeed, getUserFeed, deletePost, generateSummary, getPopularPosts, getPostById }
  from "../controllers/postController.js";
import { addComment } from "../controllers/commentController.js";
const router = express.Router();

// Create post
router.post("/", protect, createPost);

//router.post("/", protect, createPost);
router.get("/", getGlobalFeed);
router.get("/popular", getPopularPosts); // Popular feed
router.get("/feed/me", protect, getUserFeed);
router.get("/community/:communityId", getPostsByCommunity);

// AI Summarization
router.post("/:id/summarize", generateSummary);

// Upvote / downvote
router.post("/:postId/vote", protect, votePost);

// Delete post
router.delete("/:id", protect, deletePost);

// Get single post
router.get("/:id", getPostById);

// Add comment
router.post("/:id/comments", protect, addComment);

export default router;
