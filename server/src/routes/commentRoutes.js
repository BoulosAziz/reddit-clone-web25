//commentRoutes.js
const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const { addComment, getCommentsByPost } = require('../controllers/commentController');

router.post('/:postId', authMiddleware, addComment);
router.get('/:postId', getCommentsByPost);

module.exports = router;

