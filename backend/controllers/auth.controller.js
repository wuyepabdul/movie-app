import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

export const signupController = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      throw new Error("All fields are required");
    }

    const emailExist = await User.findOne({ email }).select("-password");
    if (emailExist) {
      return res.status(400).json({ message: "User already exist." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userDoc = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    // jwt
    if (userDoc) {
      generateTokenAndSetCookie(res, userDoc._id);
      return res.status(200).json({
        user: userDoc,
        message: "User created successfully",
        success: true,
      });
    }
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: error.message, error: false });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compareSync(
      password,
      userExist.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    if (userExist && isPasswordValid) {
      userExist.password = undefined;

      generateTokenAndSetCookie(res, userExist._id);
      return res.status(200).json({
        message: "Login Successful",
        user: userExist,
        success: true,
      });
    }
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: error.message, error: false });
  }
};

export const fetchUserController = async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "No user found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: error.message, error: false });
  }
};

export const logoutController = async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged out successfully" });
};
