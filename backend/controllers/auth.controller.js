import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const signupController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw new Error("All fields are required");
    }

    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ message: "User already exist." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userDoc = await User.create({
      username,
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
      generateTokenAndSetCookie();
      return res
        .status(200)
        .json({ message: "Login Successful", user: userExist, success: true });
    }
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: error.message, error: false });
  }
};
