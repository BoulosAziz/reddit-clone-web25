/* //server/src/routes/communityRoutes.js */

import express from "express";
import {
  createCommunity,
  getCommunities,
  getCommunityById,
  joinCommunity,
  leaveCommunity,
  searchCommunities,
} from "../controllers/communityController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/communities
router.get("/", getCommunities);


router.get("/search", searchCommunities);


router.get("/:id", getCommunityById);

// POST /api/communities
router.post("/", protect, createCommunity);

// POST /api/communities/:id/join
router.post("/:id/join", protect, joinCommunity);

// POST /api/communities/:id/leave
router.post("/:id/leave", protect, leaveCommunity);

export default router;


