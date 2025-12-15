//userRoutes.js
import express from "express";
import { getMe, updateMe } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/users/me     → Get profile
router.get("/me", protect, getMe);

// PUT /api/users/me     → Update profile
router.put("/me", protect, updateMe);

export default router;
