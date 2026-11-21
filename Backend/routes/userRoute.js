import express from "express";

import {
  registerUser,
  loginUser,
  loginCustomer,
  getProfile
} from "../controllers/userController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/login-customer", loginCustomer);

router.get("/profile", authMiddleware, getProfile);

export default router;