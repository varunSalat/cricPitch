/**
 * Socket event constants — mirrors server-side SOCKET_EVENTS
 * Keep in sync with: server/src/socket/events.ts
 */
export const SOCKET_EVENTS = {
  // Slots
  SLOT_GET: "slot:get",
  SLOT_LIST: "slot:list",

  SLOT_RESERVE: "slot:reserve",
  SLOT_UNRESERVE: "slot:unreserve",
  SLOT_RESERVED: "slot:reserved",

  SLOT_UPDATED: "slot:updated",

  SLOT_ERROR: "slot:error",
  SLOT_EXPIRED: "slot:expired",

  // Bookings
  BOOKING_CANCELLED: "book:cancelled",
  BOOKING_CREATED: "book:create",
} as const;
