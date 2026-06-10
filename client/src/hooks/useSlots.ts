import { useCallback, useEffect, useRef, useState } from "react";
import { useSocket } from "@/context/SocketContext";
import { SOCKET_EVENTS } from "@/lib/socketEvents";

export interface Slot {
  id: string;
  pitchId: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  status: "AVAILABLE" | "RESERVED" | "BOOKED";
  isReserved: boolean;
  isReservedByMe: boolean;
  reservationExpiresAt: string | null;
}

interface SlotListResponse {
  success: boolean;
  data: Slot[];
}

interface SlotErrorResponse {
  success?: boolean;
  message: string;
}

interface SlotUpdatedResponse {
  slotId: string;
  status: "RESERVED" | "BOOKED" | "AVAILABLE";
}

interface SlotReservedResponse {
  success: boolean;
  data: {
    id: string;
    slotId: string;
    userId: string;
    expiresAt: string;
  };
}

/**
 * Hook that encapsulates all slot-related socket communication.
 *
 * - Emits `slot:get` on mount and when pitchId/date changes
 * - Listens for `slot:list`, `slot:updated`, `slot:error`, `slot:expired`
 * - Returns slots, loading/error state, and a reserveSlot action
 */
export const useSlots = (pitchId: string | undefined, selectedDate: Date) => {
  const { socket, isConnected } = useSocket();
  const [slots, setSlots] = useState<Slot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Track the current pitchId+date to avoid stale responses
  const requestRef = useRef<string>("");

  // Format date as YYYY-MM-DD in IST for the backend
  const formatDate = useCallback((date: Date) => {
    return date.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
  }, []);

  const dateStr = formatDate(selectedDate);
  const requestKey = pitchId ? `${pitchId}:${dateStr}` : "";

  // Reset state during render when dependencies change (React recommended pattern)
  const [prevRequestKey, setPrevRequestKey] = useState("");
  if (requestKey && requestKey !== prevRequestKey) {
    setPrevRequestKey(requestKey);
    setIsLoading(true);
    setError(null);
    setSlots([]);
  }

  // Fetch slots whenever pitchId, date, or connection changes
  useEffect(() => {
    if (!socket || !isConnected || !pitchId || !requestKey) {
      return;
    }

    requestRef.current = requestKey;

    // Request slots for this pitch + date
    socket.emit(SOCKET_EVENTS.SLOT_GET, { pitchId, date: dateStr });

    // Handle slot list response
    const handleSlotList = (response: SlotListResponse) => {
      // Ignore stale responses
      if (requestRef.current !== requestKey) return;

      if (response.success) {
        setSlots(response.data);
      }
      setIsLoading(false);
    };

    // Handle real-time slot update (from other users reserving/booking)
    const handleSlotUpdated = (update: SlotUpdatedResponse) => {
      setSlots((prev) =>
        prev.map((slot) =>
          slot.id === update.slotId
            ? {
                ...slot,
                status: update.status,
                isBooked: update.status === "BOOKED",
                isReserved: update.status === "RESERVED",
                // If another user reserved it, it's not reserved by me
                isReservedByMe: false,
              }
            : slot,
        ),
      );
    };

    // Handle errors
    const handleSlotError = (response: SlotErrorResponse) => {
      if (requestRef.current !== requestKey) return;
      setError(response.message);
      setIsLoading(false);
    };

    // Handle expired reservations
    const handleSlotExpired = (update: SlotUpdatedResponse) => {
      setSlots((prev) =>
        prev.map((slot) =>
          slot.id === update.slotId
            ? {
                ...slot,
                status: "AVAILABLE",
                isReserved: false,
                isReservedByMe: false,
                reservationExpiresAt: null,
              }
            : slot,
        ),
      );
    };

    socket.on(SOCKET_EVENTS.SLOT_LIST, handleSlotList);
    socket.on(SOCKET_EVENTS.SLOT_UPDATED, handleSlotUpdated);
    socket.on(SOCKET_EVENTS.SLOT_ERROR, handleSlotError);
    socket.on(SOCKET_EVENTS.SLOT_EXPIRED, handleSlotExpired);

    return () => {
      socket.off(SOCKET_EVENTS.SLOT_LIST, handleSlotList);
      socket.off(SOCKET_EVENTS.SLOT_UPDATED, handleSlotUpdated);
      socket.off(SOCKET_EVENTS.SLOT_ERROR, handleSlotError);
      socket.off(SOCKET_EVENTS.SLOT_EXPIRED, handleSlotExpired);
    };
  }, [socket, isConnected, pitchId, selectedDate, formatDate]);

  // Reserve a slot
  const reserveSlot = useCallback(
    (slotId: string): Promise<SlotReservedResponse> => {
      return new Promise((resolve, reject) => {
        if (!socket || !isConnected) {
          reject(new Error("Socket not connected"));
          return;
        }

        socket.emit(SOCKET_EVENTS.SLOT_RESERVE, { slotId });

        const handleReserved = (response: SlotReservedResponse) => {
          if (response.success) {
            // Optimistic update: mark slot as reserved by me
            setSlots((prev) =>
              prev.map((slot) =>
                slot.id === slotId
                  ? {
                      ...slot,
                      status: "RESERVED" as const,
                      isReserved: true,
                      isReservedByMe: true,
                      reservationExpiresAt: response.data.expiresAt,
                    }
                  : slot,
              ),
            );
            resolve(response);
          }
          cleanup();
        };

        const handleError = (response: SlotErrorResponse) => {
          reject(new Error(response.message));
          cleanup();
        };

        const cleanup = () => {
          socket.off(SOCKET_EVENTS.SLOT_RESERVED, handleReserved);
          socket.off(SOCKET_EVENTS.SLOT_ERROR, handleError);
        };

        socket.on(SOCKET_EVENTS.SLOT_RESERVED, handleReserved);
        socket.on(SOCKET_EVENTS.SLOT_ERROR, handleError);

        // Timeout after 10 seconds
        setTimeout(() => {
          cleanup();
          reject(new Error("Reservation request timed out"));
        }, 10000);
      });
    },
    [socket, isConnected],
  );

  // Unreserve a slot
  const unreserveSlot = useCallback(
    (slotId: string): void => {
      if (!socket || !isConnected) return;

      socket.emit(SOCKET_EVENTS.SLOT_UNRESERVE, { slotId });

      // Optimistic update: mark slot as available immediately
      setSlots((prev) =>
        prev.map((slot) =>
          slot.id === slotId
            ? {
                ...slot,
                status: "AVAILABLE" as const,
                isReserved: false,
                isReservedByMe: false,
                reservationExpiresAt: null,
              }
            : slot,
        ),
      );
    },
    [socket, isConnected],
  );

  return { slots, isLoading, error, reserveSlot, unreserveSlot };
};
