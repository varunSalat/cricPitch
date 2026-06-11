import { Router } from "express";
import { bookingSchema } from "../../validations";
import { validate } from "../../middlewares";
import { authenticate } from "../../middlewares/auth.middleware";
import { BookingController } from "../../controllers/booking.controller";

const router = Router();

const bookingController = new BookingController();

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create Booking
 *     tags:
 *       - Bookings
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - slotId
 *             properties:
 *               slotId:
 *                 type: string
 *                 example: 049a73a4-dda9-4d4e-b5fc-02d134e305a7
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  authenticate,
  validate(bookingSchema),
  bookingController.createBooking,
);

/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Get My Bookings
 *     tags:
 *       - Bookings
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user bookings
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticate, bookingController.getMyBookings);

/**
 * @swagger
 * /bookings/{id}:
 *   delete:
 *     summary: Cancel Booking
 *     tags:
 *       - Bookings
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID to cancel
 *     responses:
 *       200:
 *         description: Booking cancelled successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Booking not found
 */
router.delete("/:id", authenticate, bookingController.cancelBooking);

export default router;
