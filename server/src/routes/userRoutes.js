//server/src/routes/userRoutes.js
import express from "express";
import { getMe, updateMe, searchUsers, getUserByUsername } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Search users
router.get("/search", searchUsers);

// GET /api/users/me     → Get profile
router.get("/me", protect, getMe);

// PUT /api/users/me     → Update profile
router.put("/me", protect, updateMe);
router.get("/:username", getUserByUsername);

export default router;
