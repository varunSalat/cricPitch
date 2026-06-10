import { AppError } from "../utils";
import { TimeSlotRepository, ReservationRepository } from "../repositories";

export class TimeSlotService {
  private timeSlotRepository = new TimeSlotRepository();

  private reservationRepository = new ReservationRepository();

  async getAvailableSlots(pitchId: string, date: Date, userId: string) {
    if (!pitchId) {
      throw new AppError("Pitch Id is required", 400);
    }

    const slots = await this.timeSlotRepository.findByPitchId(pitchId, date);

    const reservations =
      await this.reservationRepository.findActiveReservations(
        slots.map((slot) => slot.id),
      );

    return slots.map((slot) => {
      const reservation = reservations.find((r) => r.slotId === slot.id);

      return {
        ...slot,

        status: slot.isBooked
          ? "BOOKED"
          : reservation
            ? "RESERVED"
            : "AVAILABLE",

        isReserved: !!reservation,

        isReservedByMe: reservation?.userId === userId,

        reservationExpiresAt: reservation?.expiresAt ?? null,
      };
    });
  }

  async getSlotById(id: string) {
    const slot = await this.timeSlotRepository.findById(id);

    if (!slot) {
      throw new AppError("Slot not found", 404);
    }

    return slot;
  }

  async markAsBooked(id: string) {
    const slot = await this.timeSlotRepository.findById(id);

    if (!slot) {
      throw new AppError("Slot not found", 404);
    }

    if (slot.isBooked) {
      throw new AppError("Slot already booked", 400);
    }

    return this.timeSlotRepository.updateBookingStatus(id, true);
  }
}
