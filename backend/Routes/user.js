import express from "express";
import { updateUser, deleteUser,getAllUser,getSingleUser,getUserProfile,getMyAppointments } from "../Controllers/userController.js";
import {authenticate, restrict} from "../auth/verifyToken.js";

const router = express.Router();

router.get("/:id", authenticate, restrict(['patient']), getSingleUser);
router.get("/", authenticate, restrict(['admin']), getAllUser);
router.put("/:id", authenticate, restrict(['patient']), updateUser);
router.delete("/:id", authenticate, restrict(['patient']), deleteUser);
router.get("/profile/me", authenticate, restrict(['patient']), getUserProfile);
router.get("/appointments/my-appointments", authenticate, restrict(['patient']), getMyAppointments);

export default router;