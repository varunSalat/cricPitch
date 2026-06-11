import { privateFetch } from "./fetchAPI";

const IST_TIMEZONE = "Asia/Kolkata";

export interface ApiBooking {
  id: string;
  timeSlotId: string;
  createdAt: string;
  timeSlot: {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
    pitch: {
      name: string;
      location: string;
      pricePerHour: string;
    };
  };
}

export interface BookingView {
  id: string;
  title: string;
  date: string;
  month: string;
  time: string;
  day: string;
  price: string;
  status: "Confirmed" | "Cancelled";
  isUpcoming: boolean;
}

export const fetchMyBookings = (): Promise<ApiBooking[]> =>
  privateFetch("/bookings").then((res) => res.data ?? []);

export const cancelBooking = (bookingId: string): Promise<unknown> =>
  privateFetch(`/bookings/${bookingId}`, { method: "DELETE" });

/**
 * Combine the slot calendar date with a "h:mm AM/PM" time string into a Date,
 * used to decide whether a booking is upcoming or in the past.
 */
const buildSlotDateTime = (dateISO: string, timeStr: string): Date => {
  const dateTime = new Date(dateISO);
  const match = timeStr.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);

  if (match) {
    let hours = Number(match[1]);
    const minutes = Number(match[2]);
    const meridiem = match[3].toUpperCase();

    if (meridiem === "PM" && hours !== 12) hours += 12;
    if (meridiem === "AM" && hours === 12) hours = 0;

    dateTime.setHours(hours, minutes, 0, 0);
  }

  return dateTime;
};

export const toBookingView = (booking: ApiBooking): BookingView => {
  const slotDate = new Date(booking.timeSlot.date);
  const endsAt = buildSlotDateTime(
    booking.timeSlot.date,
    booking.timeSlot.endTime,
  );

  return {
    id: booking.id,
    title: booking.timeSlot.pitch.name,
    date: slotDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      timeZone: IST_TIMEZONE,
    }),
    month: slotDate
      .toLocaleDateString("en-US", { month: "short", timeZone: IST_TIMEZONE })
      .toUpperCase(),
    day: slotDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      timeZone: IST_TIMEZONE,
    }),
    time: `${booking.timeSlot.startTime} – ${booking.timeSlot.endTime}`,
    price: booking.timeSlot.pitch.pricePerHour,
    status: "Confirmed",
    isUpcoming: endsAt.getTime() >= Date.now(),
  };
};
