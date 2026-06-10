import { prisma } from "../config";

export class BookingRepository {
  async create(userId: string, slotId: string) {
    return prisma.booking.create({
      data: {
        userId,
        timeSlotId: slotId,
      },
    });
  }

  async findBySlotId(slotId: string) {
    return prisma.booking.findFirst({
      where: {
        timeSlotId: slotId,
      },
    });
  }

  async findByUserId(userId: string) {
    return prisma.booking.findMany({
      where: {
        userId,
      },
      include: {
        timeSlot: {
          include: {
            pitch: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}
