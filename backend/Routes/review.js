import express from "express";
import { getAllReviews, createReview } from "../Controllers/reviewController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

/**
 * Express router for handling review routes.
 * @type {express.Router}
 */
const router = express.Router({mergeParams: true});

router.route("/").get(getAllReviews).post(authenticate, restrict(["patient"]), createReview);

export default router;