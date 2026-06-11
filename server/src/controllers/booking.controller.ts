import { Request, Response } from "express";
import { BookingService } from "../services";
import { asyncHandler, ApiResponse } from "../utils";
import { io } from "../socket";
import { SOCKET_EVENTS } from "../socket/events";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";

export class BookingController {
  private bookingService = new BookingService();

  createBooking = asyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {
      if (!req.user) {
        throw new Error("Unauthorized");
      }

      const booking = await this.bookingService.createBooking(
        req.user.userId,
        req.body.slotId,
      );

      io.emit(SOCKET_EVENTS.SLOT_UPDATED, {
        slotId: req.body.slotId,
        status: "BOOKED",
      });
      io.emit(SOCKET_EVENTS.BOOKING_CREATED, booking);
      return res
        .status(201)
        .json(new ApiResponse(true, 201, "Booking successful", booking));
    },
  );

  getMyBookings = asyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {
      if (!req.user) {
        throw new Error("Unauthorized");
      }

      const bookings = await this.bookingService.getMyBookings(req.user.userId);

      return res
        .status(200)
        .json(
          new ApiResponse(true, 200, "Bookings fetched successfully", bookings),
        );
    },
  );

  cancelBooking = asyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {
      if (!req.user) {
        throw new Error("Unauthorized");
      }

      const booking = await this.bookingService.cancelBooking(
        req.user.userId,
        req.params.id as string,
      );

      io.emit(SOCKET_EVENTS.SLOT_UPDATED, {
        slotId: booking.timeSlotId,
        status: "AVAILABLE",
      });
      io.emit(SOCKET_EVENTS.BOOKING_CANCELLED, { bookingId: booking.id });

      return res
        .status(200)
        .json(
          new ApiResponse(true, 200, "Booking cancelled successfully", {
            id: booking.id,
          }),
        );
    },
  );
}
