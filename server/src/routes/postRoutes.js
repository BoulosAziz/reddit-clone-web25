//server/src/routes/postRoutes.js
import express from "express"; 
import { protect } from "../middleware/authMiddleware.js"; 
import { createPost, getPostsByCommunity, votePost, getGlobalFeed, getUserFeed } 
from "../controllers/postController.js";
const router = express.Router();

// Create post
router.post("/", protect, createPost);

router.post("/", protect, createPost);
router.get("/feed", getGlobalFeed);
router.get("/feed/me", protect, getUserFeed);
router.get("/community/:communityId", getPostsByCommunity);
router.post("/:postId/vote", protect, votePost);

export default router;
