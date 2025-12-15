import Comment from "../models/Comment.js";
import handleAsync from "../utils/handleAsync.js";

// Add comment
export const addComment = handleAsync(async (req, res) => {
  const comment = await Comment.create({
    content: req.body.content,
    author: req.user.id,
    post: req.params.postId
  });
  res.status(201).json(comment);
});

// Get comments for a post
export const getCommentsByPost = handleAsync(async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate('author', 'username')
    .sort({ createdAt: 1 });
  res.json(comments);
});
