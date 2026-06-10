import { ReservationStatus } from "@prisma/client";
import { prisma } from "../config";
import { io } from "../socket";
import { SOCKET_EVENTS } from "../socket/events";

export const startReservationExpiryJob = () => {
  setInterval(async () => {
    try {
      const expiredReservations = await prisma.reservation.findMany({
        where: {
          status: ReservationStatus.ACTIVE,
          expiresAt: {
            lt: new Date(),
          },
        },
      });

      if (!expiredReservations.length) {
        return;
      }

      await prisma.reservation.updateMany({
        where: {
          id: {
            in: expiredReservations.map((r) => r.id),
          },
        },
        data: {
          status: ReservationStatus.EXPIRED,
        },
      });

      expiredReservations.forEach((reservation) => {
        io.emit(SOCKET_EVENTS.SLOT_UPDATED, {
          slotId: reservation.slotId,
          status: "AVAILABLE",
        });
      });

      console.log(`${expiredReservations.length} reservations expired`);
    } catch (error) {
      console.error(error);
    }
  }, 30000);
};
