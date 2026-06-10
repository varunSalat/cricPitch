import { prisma } from "../config";

export class TimeSlotRepository {
  async findByPitchId(pitchId: string, date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return prisma.timeSlot.findMany({
      where: {
        pitchId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      orderBy: {
        startTime: "asc",
      },
    });
  }

  async findById(id: string) {
    return prisma.timeSlot.findUnique({
      where: {
        id,
      },
    });
  }

  async updateBookingStatus(id: string, isBooked: boolean) {
    return prisma.timeSlot.update({
      where: {
        id,
      },
      data: {
        isBooked,
      },
    });
  }

  async findActiveReservations(slotIds: string[]) {
    return prisma.reservation.findMany({
      where: {
        slotId: {
          in: slotIds,
        },
        status: "ACTIVE",
        expiresAt: {
          gt: new Date(),
        },
      },
    });
  }
}
