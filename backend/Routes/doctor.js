import express from "express";
import { updateDoctor, deleteDoctor,getAllDoctor,getSingleDoctor, getDoctorProfile } from "../Controllers/doctorController.js";

import { authenticate, restrict } from "../auth/verifyToken.js";
import reviewRouter from "./review.js";

/**
 * Express router object for handling routes.
 * @type {express.Router}
 */
/**
 * Express router instance for handling doctor routes.
 * @type {express.Router}
 */
const router = express.Router();

// nested route
router.use("/:doctorID/reviews",reviewRouter);

router.get("/:id", getSingleDoctor);
router.get("/",getAllDoctor);
router.put("/:id", authenticate, restrict(['doctor']),updateDoctor);
router.delete("/:id", authenticate, restrict(['doctor']), deleteDoctor);

router.get("/profile/me", authenticate, restrict(['doctor']), getDoctorProfile);

export default router;