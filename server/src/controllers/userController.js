//userController.js
import User from "../models/User.js";
import Post from "../models/Post.js";

/* ---------------------------------------
   GET LOGGED-IN USER PROFILE
---------------------------------------- */
export const getMe = async (req, res) => {
  try {
    // req.user is added by authMiddleware
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("joinedCommunities", "name icon");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ---------------------------------------
   UPDATE USER PROFILE
---------------------------------------- */
export const updateMe = async (req, res) => {
  try {
    const { username, bio, avatar } = req.body;

    const updatedData = {};

    if (username) updatedData.username = username;
    if (bio) updatedData.bio = bio;
    if (avatar) updatedData.avatar = avatar; // later you can implement file upload

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      updatedData,
      { new: true }
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Search users by username
// @route   GET /api/users/search?username=
// @access  Protected
export const searchUsers = async (req, res) => {
  try {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ message: "Username query is required" });
    }

    const users = await User.find({
      username: { $regex: username, $options: "i" }
    }).select("-password");

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get user by username
// @route   GET /api/users/:username
// @access  Public
export const getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne({
      username: { $regex: new RegExp(`^${req.params.username}$`, "i") }
    }).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    // Fetch user's posts
    const posts = await Post.find({ author: user._id })
      .populate("community", "name")
      .populate("author", "username avatar")
      .sort({ createdAt: -1 });

    res.json({ user, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

