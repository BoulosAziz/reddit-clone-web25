//server/src/routes/commentRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addComment,
  getCommentsByPost
} from "../controllers/commentController.js";

const router = express.Router();

// Add comment
router.post("/:postId", protect, addComment);

// Get comments
router.get("/:postId", getCommentsByPost);

export default router;
