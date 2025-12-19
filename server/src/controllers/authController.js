import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check fields exist
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = await User.create({ username, email, password });

    return res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      avatar: newUser.avatar,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    return res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
