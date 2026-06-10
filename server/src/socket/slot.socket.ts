import { Server, Socket } from "socket.io";
import { ReservationService, TimeSlotService } from "../services";
import { SOCKET_EVENTS } from "./events";

export const slotSocket = (io: Server, socket: Socket) => {
  const timeSlotService = new TimeSlotService();
  const reservationService = new ReservationService();

  /**
   * Get slots by pitch id
   */
  socket.on(
    SOCKET_EVENTS.SLOT_GET,
    async ({ pitchId, date }: { pitchId: string; date: string }) => {
      try {
        const user = (socket as any).user;

        if (!user) {
          return socket.emit(SOCKET_EVENTS.SLOT_ERROR, {
            message: "Unauthorized",
          });
        }
        const slots = await timeSlotService.getAvailableSlots(
          pitchId,
          new Date(date),
          user.userId,
        );

        const formattedSlots = slots.map((slot) => ({
          ...slot,
          date: slot.date.toLocaleDateString("en-CA", {
            timeZone: "Asia/Kolkata",
          }),
        }));

        socket.emit(SOCKET_EVENTS.SLOT_LIST, {
          success: true,
          data: formattedSlots,
        });
      } catch (error: any) {
        socket.emit(SOCKET_EVENTS.SLOT_ERROR, {
          success: false,
          message: error.message,
        });
      }
    },
  );

  /**
   * Reserve slot
   */
  socket.on(
    SOCKET_EVENTS.SLOT_RESERVE,
    async ({ slotId }: { slotId: string }) => {
      try {
        const user = (socket as any).user;

        if (!user) {
          return socket.emit(SOCKET_EVENTS.SLOT_ERROR, {
            message: "Unauthorized",
          });
        }

        const reservation = await reservationService.reserveSlot(
          user.userId,
          slotId,
        );
        socket.emit(SOCKET_EVENTS.SLOT_RESERVED, {
          success: true,
          data: reservation,
        });

        socket.broadcast.emit(SOCKET_EVENTS.SLOT_UPDATED, {
          slotId,
          status: "RESERVED",
        });
      } catch (error: any) {
        socket.emit(SOCKET_EVENTS.SLOT_ERROR, {
          success: false,
          message: error.message,
        });
      }
    },
  );

  socket.on(
    SOCKET_EVENTS.SLOT_UNRESERVE,
    async ({ slotId }: { slotId: string }) => {
      try {
        const user = (socket as any).user;
        if (!user) {
          return socket.emit(SOCKET_EVENTS.SLOT_ERROR, {
            message: "Unauthorized",
          });
        }
        await reservationService.cancelReservation(user.userId, slotId);
        // notify other users that it's available again
        socket.broadcast.emit(SOCKET_EVENTS.SLOT_UPDATED, {
          slotId,
          status: "AVAILABLE",
        });
      } catch (error: any) {
        socket.emit(SOCKET_EVENTS.SLOT_ERROR, {
          success: false,
          message: error.message,
        });
      }
    },
  );

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
};
