const Post = require('../models/Post');
const handleAsync = require('../utils/handleAsync');

// Create a post
exports.createPost = handleAsync(async (req, res) => {
  const { title, content, community } = req.body;

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
exports.getPostsByCommunity = handleAsync(async (req, res) => {
  const posts = await Post.find({ community: req.params.communityId })
                          .populate('author', 'username')
                          .sort({ createdAt: -1 });
  res.json(posts);
});

// Upvote/downvote a post
exports.votePost = handleAsync(async (req, res) => {
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
