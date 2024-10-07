import express from 'express';
import { authenticate } from './../auth/verifyToken.js';
import { getCheckoutSession } from '../Controllers/bookingController.js';

const router = express.Router();

/**
 * @route POST /checkout-session/:doctorId
 * @desc Create a checkout session for a specific doctor
 * @access Private
 */
router.post('/checkout-session/:doctorId', authenticate, getCheckoutSession);

export default router;