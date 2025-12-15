//postController.js
import Post from "../models/Post.js";
import handleAsync from "../utils/handleAsync.js";

// Create a post
export const createPost = handleAsync(async (req, res) => {
  const { title, content, community} = req.body;

  const newPost = new Post({
    title,
    content,
    community,
    author: req.user._id,
  });

  const savedPost = await newPost.save();
  res.status(201).json(savedPost);
});

// Get posts by community
export const getPostsByCommunity = handleAsync(async (req, res) => {
  const posts = await Post.find({ community: req.params.communityId })
    .populate('author', 'username')
    .sort({ createdAt: -1 });
  res.json(posts);
});

// Upvote / downvote a post
export const votePost = handleAsync(async (req, res) => {
  const { type } = req.body; // 'upvote' or 'downvote'
  const post = await Post.findById(req.params.postId);

  // Remove opposite vote if exists
  post.upvotes = post.upvotes.filter(id => id.toString() !== req.user.id);
  post.downvotes = post.downvotes.filter(id => id.toString() !== req.user.id);

  if(type === 'upvote') post.upvotes.push(req.user.id);
  else if(type === 'downvote') post.downvotes.push(req.user.id);

  await post.save();
  res.json(post);
});
import Comment from "../models/Comment.js";

// Delete post
export const deletePost = handleAsync(async (req, res) => {
  // delete all comments on this post
  await Comment.deleteMany({ post: req.post._id });

  // delete the post itself
  await req.post.deleteOne();

  res.json({ message: "Post deleted successfully" });
});


// Global feed (all posts)
export const getGlobalFeed = handleAsync(async (req, res) => {
  const posts = await Post.find()
    .populate("author", "username")
    .populate("community", "name")
    .sort({ createdAt: -1 });

  res.json(posts);
});

// Personalized feed (joined communities only)
export const getUserFeed = handleAsync(async (req, res) => {
  const posts = await Post.find({
    community: { $in: req.user.joinedCommunities },
  })
    .populate("author", "username")
    .populate("community", "name")
    .sort({ createdAt: -1 });

  res.json(posts);
});
