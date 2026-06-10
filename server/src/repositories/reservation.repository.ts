import { ReservationStatus } from "@prisma/client";
import { prisma } from "../config";

export class ReservationRepository {
  async expireOldReservations() {
    return prisma.reservation.updateMany({
      where: {
        status: ReservationStatus.ACTIVE,
        expiresAt: {
          lt: new Date(),
        },
      },
      data: {
        status: ReservationStatus.EXPIRED,
      },
    });
  }

  async findActiveReservation(slotId: string) {
    return prisma.reservation.findFirst({
      where: {
        slotId,
        status: ReservationStatus.ACTIVE,
        expiresAt: {
          gt: new Date(),
        },
      },
    });
  }

  async findActiveReservations(slotIds: string[]) {
    return prisma.reservation.findMany({
      where: {
        slotId: {
          in: slotIds,
        },
        status: ReservationStatus.ACTIVE,
        expiresAt: {
          gt: new Date(),
        },
      },
      select: {
        id: true,
        slotId: true,
        userId: true,
        expiresAt: true,
        status: true,
      },
    });
  }

  async createReservation(userId: string, slotId: string) {
    return prisma.reservation.create({
      data: {
        userId,
        slotId,
        status: ReservationStatus.ACTIVE,
        expiresAt: new Date(Date.now() + 2 * 60 * 1000),
      },
    });
  }

  async findUserActiveReservation(userId: string, slotId: string) {
    return prisma.reservation.findFirst({
      where: {
        userId,
        slotId,
        status: "ACTIVE",
        expiresAt: {
          gt: new Date(),
        },
      },
    });
  }

  async completeReservation(id: string) {
    return prisma.reservation.update({
      where: { id },
      data: {
        status: "COMPLETED",
      },
    });
  }

  async cancelReservation(id: string) {
    return prisma.reservation.update({
      where: { id },
      data: {
        status: "EXPIRED",
      },
    });
  }
}
