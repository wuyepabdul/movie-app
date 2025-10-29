import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken";

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
    generateTokenAndSetCookie(res, userDoc._id);

    return res
      .status(200)
      .json({
        user: userDoc,
        message: "User created successfully",
        success: true,
      });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: error.message, error: false });
  }
};
