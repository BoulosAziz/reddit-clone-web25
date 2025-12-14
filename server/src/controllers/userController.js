import User from "../models/User.js";

/* ---------------------------------------
   GET LOGGED-IN USER PROFILE
---------------------------------------- */
export const getMe = async (req, res) => {
  try {
    // req.user is added by authMiddleware
    const user = await User.findById(req.user.id).select("-password");

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
