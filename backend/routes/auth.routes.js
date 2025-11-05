import express from "express";
import {
  fetchUserController,
  loginController,
  logoutController,
  signupController,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../utils/authMiddleWare.js";

const router = express.Router();

router.post("/signup", signupController);

router.post("/signin", loginController);

router.get("/fetch-user", authMiddleware, fetchUserController);

router.post("/logout", logoutController);

export default router;
