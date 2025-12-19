/* //server/src/controllers/communityController.js */
import Community from "../models/Community.js";
import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

// Helper to populate comment counts AND score (duplicated from postController for now)
const populatePostFields = async (posts) => {
  return Promise.all(posts.map(async (post) => {
    const commentCount = await Comment.countDocuments({ post: post._id });
    const score = (post.upvotes ? post.upvotes.length : 0) - (post.downvotes ? post.downvotes.length : 0);
    return { ...post.toObject(), commentCount, score };
  }));
};

/* ---------------------------------------
   CREATE COMMUNITY
---------------------------------------- */
export const createCommunity = async (req, res) => {
  try {
    const { name, description } = req.body;

    const exists = await Community.findOne({ name });
    if (exists)
      return res.status(400).json({ message: "Community already exists" });

    const community = await Community.create({
      name,
      description,
      creator: req.user._id,
      members: [req.user._id],
    });

    // add community to user's joinedCommunities
    await User.findByIdAndUpdate(req.user._id, {
      $push: { joinedCommunities: community._id },
    });

    res.status(201).json(community);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ---------------------------------------
   GET ALL COMMUNITIES
---------------------------------------- */
export const getCommunities = async (req, res) => {
  try {
    const communities = await Community.find().sort({ createdAt: -1 });
    res.json(communities);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getCommunityById = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    if (!community)
      return res.status(404).json({ message: "Community not found" });

    const posts = await Post.find({ community: community._id })
      .populate("author", "username")
      .sort({ createdAt: -1 });

    const postsWithCounts = await populatePostFields(posts);

    res.json({ community, posts: postsWithCounts });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


/* ---------------------------------------
   JOIN COMMUNITY
---------------------------------------- */
export const joinCommunity = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);

    if (!community)
      return res.status(404).json({ message: "Community not found" });

    if (community.members.includes(req.user._id))
      return res.status(400).json({ message: "Already joined" });

    community.members.push(req.user._id);
    await community.save();

    await User.findByIdAndUpdate(req.user._id, {
      $push: { joinedCommunities: community._id },
    });

    res.json({ message: "Joined community" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ---------------------------------------
   LEAVE COMMUNITY
---------------------------------------- */
export const leaveCommunity = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);

    if (!community)
      return res.status(404).json({ message: "Community not found" });

    community.members = community.members.filter(
      (id) => id.toString() !== req.user._id.toString()
    );
    await community.save();

    await User.findByIdAndUpdate(req.user._id, {
      $pull: { joinedCommunities: community._id },
    });

    res.json({ message: "Left community" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ---------------------------------------
   GET USER'S JOINED COMMUNITIES
---------------------------------------- */
export const getUserJoinedCommunities = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "joinedCommunities",
      "name description members createdAt"
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.joinedCommunities);
  } catch (error) {
    console.error("Error fetching joined communities:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const searchCommunities = async (req, res) => {
  try {
    const { q } = req.query; // /api/communities/search?q=cats

    if (!q) return res.status(400).json({ message: "Query is required" });

    const communities = await Community.find({
      name: { $regex: q, $options: "i" }, // case-insensitive
    }).sort({ createdAt: -1 });

    res.json(communities);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};