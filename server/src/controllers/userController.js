//userController.js
import User from "../models/User.js";
<<<<<<< HEAD
import Post from "../models/Post.js";
=======
>>>>>>> 71a51ead299df8a865625f022d89588fcf604752

/* ---------------------------------------
   GET LOGGED-IN USER PROFILE
---------------------------------------- */
export const getMe = async (req, res) => {
  try {
    // req.user is added by authMiddleware
<<<<<<< HEAD
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("joinedCommunities", "name icon");
=======
    const user = await User.findById(req.user.id).select("-password");
>>>>>>> 71a51ead299df8a865625f022d89588fcf604752

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

<<<<<<< HEAD
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
      .populate("author", "username")
      .sort({ createdAt: -1 });

    res.json({ user, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

=======
>>>>>>> 71a51ead299df8a865625f022d89588fcf604752
// @desc    Upload user avatar
// @route   PUT /api/users/me/avatar
// @access  Protected
export const uploadUserAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const avatarPath = `/uploads/avatars/${req.file.filename}`;

    req.user.avatar = avatarPath;
    await req.user.save();

    res.status(200).json({
      message: "Avatar uploaded successfully",
      avatar: avatarPath,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
<<<<<<< HEAD
=======

>>>>>>> 71a51ead299df8a865625f022d89588fcf604752
