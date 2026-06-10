import { Router } from "express";

import authRoutes from "./public/auth.route";
import pitchRoutes from "./protected/pitch.route";
import userRoutes from "./protected/user.route";
import bookingRoutes from "./protected/booking.routes";

const router = Router();

/**
 * Public Routes
 */
router.use("/auth", authRoutes);

/**
 * Protected Routes
 */
router.use("/pitches", pitchRoutes);
router.use("/users", userRoutes);
router.use("/bookings", bookingRoutes);

/**
 * Admin Routes
 */
// router.use("/admin", adminRoutes);

export default router;
