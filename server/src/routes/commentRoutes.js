import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addComment,
  getCommentsByPost,
  deleteComment
} from "../controllers/commentController.js";
import { checkCommentOwner } from "../middleware/commentMiddleware.js";

const router = express.Router();

// Add comment
router.post("/:postId", protect, addComment);

// Get comments
router.get("/:postId", getCommentsByPost);

// Delete comment
router.delete(
  "/:commentId",
  protect,
  checkCommentOwner,
  deleteComment
);

export default router;
