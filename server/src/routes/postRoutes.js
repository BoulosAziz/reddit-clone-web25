//server/src/routes/postRoutes.js
import express from "express"; 
import { protect } from "../middleware/authMiddleware.js"; 
import { createPost, getPostsByCommunity, votePost } 
from "../controllers/postController.js";
const router = express.Router();



// Create post
router.post("/", protect, createPost);

// Get posts by community
router.get("/community/:communityId", getPostsByCommunity);
// Upvote / downvote
router.post("/:postId/vote", protect, votePost);

export default router;
