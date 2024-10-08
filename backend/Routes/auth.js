import express from "express";
import { register, login } from "../Controllers/authController.js";

const router = express.Router();

/**
 * @route POST /register
 * @desc Register a new user
 * @access Public
 */
router.post("/register", register);

/**
 * @route POST /login
 * @desc Login a user
 * @access Public
 */
router.post("/login", login);

export default router;