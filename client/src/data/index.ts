export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}


export const upcomingBookings = [
  {
    id: "1",
    date: "10",
    month: "JUN",
    title: "Champions Turf Ground",
    time: "7:00 AM – 8:00 AM",
    day: "Wednesday, Jun 10",
    price: "1500",
    status: "Confirmed",
    statusColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "2",
    date: "9",
    month: "JUN",
    title: "Striker Box Cricket",
    time: "7:00 PM – 8:00 PM",
    day: "Tuesday, Jun 9",
    price: "800",
    status: "Confirmed",
    statusColor: "bg-emerald-100 text-emerald-700",
  },
];

export const pastBookings = [
  {
    id: "3",
    date: "10",
    month: "JUN",
    title: "Champions Turf Ground",
    time: "6:00 AM – 7:00 AM",
    day: "Wednesday, Jun 10",
    price: "1500",
    status: "Cancelled",
    statusColor: "bg-rose-100 text-rose-700",
  },
];

export const mockSlots: TimeSlot[] = [
  { id: "1", startTime: "6:00 AM", endTime: "7:00 AM", isBooked: false },
  { id: "2", startTime: "7:00 AM", endTime: "8:00 AM", isBooked: true },
  { id: "3", startTime: "8:00 AM", endTime: "9:00 AM", isBooked: false },
  { id: "4", startTime: "9:00 AM", endTime: "10:00 AM", isBooked: false },
  { id: "5", startTime: "10:00 AM", endTime: "11:00 AM", isBooked: false },
  { id: "6", startTime: "11:00 AM", endTime: "12:00 PM", isBooked: false },
  { id: "7", startTime: "12:00 PM", endTime: "1:00 PM", isBooked: false },
  { id: "8", startTime: "1:00 PM", endTime: "2:00 PM", isBooked: false },
  { id: "9", startTime: "2:00 PM", endTime: "3:00 PM", isBooked: false },
  { id: "10", startTime: "3:00 PM", endTime: "4:00 PM", isBooked: false },
  { id: "11", startTime: "4:00 PM", endTime: "5:00 PM", isBooked: false },
  { id: "12", startTime: "5:00 PM", endTime: "6:00 PM", isBooked: false },
  { id: "13", startTime: "6:00 PM", endTime: "7:00 PM", isBooked: false },
  { id: "14", startTime: "7:00 PM", endTime: "8:00 PM", isBooked: false },
  { id: "15", startTime: "8:00 PM", endTime: "9:00 PM", isBooked: false },
  { id: "16", startTime: "9:00 PM", endTime: "10:00 PM", isBooked: false },
];
