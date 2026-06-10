import { prisma } from "../config";
import { ReservationStatus } from "@prisma/client";
import { ReservationRepository } from "../repositories";
import { AppError, logger } from "../utils";

export class ReservationService {
  private reservationRepository = new ReservationRepository();

  async reserveSlot(userId: string, slotId: string) {
    logger.info("userId", userId);
    // First expire old reservations
    await this.reservationRepository.expireOldReservations();

    return prisma.$transaction(async (tx) => {
      const existing = await tx.reservation.findFirst({
        where: {
          slotId,
          status: ReservationStatus.ACTIVE,
          expiresAt: {
            gt: new Date(),
          },
        },
      });

      if (existing) {
        throw new AppError("Slot already reserved", 400);
      }

      return tx.reservation.create({
        data: {
          userId,
          slotId,
          status: ReservationStatus.ACTIVE,
          expiresAt: new Date(Date.now() + 2 * 60 * 1000),
        },
      });
    });
  }

  async cancelReservation(userId: string, slotId: string) {
    const reservation =
      await this.reservationRepository.findUserActiveReservation(
        userId,
        slotId,
      );
    if (!reservation) {
      throw new AppError("Reservation not found", 404);
    }
    return this.reservationRepository.cancelReservation(reservation.id);
  }
}
