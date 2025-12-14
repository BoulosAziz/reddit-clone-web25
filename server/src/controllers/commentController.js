//commentController.js
const Comment = require('../models/Comment');
const handleAsync = require('../utils/handleAsync');

// Add comment
exports.addComment = handleAsync(async (req, res) => {
  const comment = await Comment.create({
    content: req.body.content,
    author: req.user.id,
    post: req.params.postId
  });
  res.status(201).json(comment);
});

// Get comments for a post
exports.getCommentsByPost = handleAsync(async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
                                .populate('author', 'username')
                                .sort({ createdAt: 1 });
  res.json(comments);
});

