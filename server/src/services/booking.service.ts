import { prisma } from "../config";
import {
  BookingRepository,
  ReservationRepository,
  TimeSlotRepository,
} from "../repositories";
import { AppError } from "../utils";

export class BookingService {
  private bookingRepository = new BookingRepository();

  private reservationRepository = new ReservationRepository();

  private timeSlotRepository = new TimeSlotRepository();

  async createBooking(userId: string, slotId: string) {
    const reservation =
      await this.reservationRepository.findUserActiveReservation(
        userId,
        slotId,
      );

    if (!reservation) {
      throw new AppError("No active reservation found", 400);
    }

    const slot = await this.timeSlotRepository.findById(slotId);

    if (!slot) {
      throw new AppError("Slot not found", 404);
    }

    if (slot.isBooked) {
      throw new AppError("Slot already booked", 400);
    }

    const booking = await prisma.$transaction(async (tx) => {
      const createdBooking = await tx.booking.create({
        data: {
          userId,
          timeSlotId: slotId,
        },
      });

      await tx.timeSlot.update({
        where: {
          id: slotId,
        },
        data: {
          isBooked: true,
        },
      });

      await tx.reservation.update({
        where: {
          id: reservation.id,
        },
        data: {
          status: "COMPLETED",
        },
      });

      return createdBooking;
    });

    return booking;
  }

  async getMyBookings(userId: string) {
    return this.bookingRepository.findByUserId(userId);
  }

  async cancelBooking(userId: string, bookingId: string) {
    const booking = await this.bookingRepository.findByIdAndUser(
      bookingId,
      userId,
    );

    if (!booking) {
      throw new AppError("Booking not found", 404);
    }

    await prisma.$transaction(async (tx) => {
      await tx.booking.delete({
        where: {
          id: booking.id,
        },
      });

      await tx.timeSlot.update({
        where: {
          id: booking.timeSlotId,
        },
        data: {
          isBooked: false,
        },
      });
    });

    return booking;
  }
}
