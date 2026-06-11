import {
  CalendarDays,
  Clock3,
  IndianRupee,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";

import type { BookingView } from "@/lib/bookings";
import { Badge } from "@/components/ui/badge";
import BookingCancellationModal from "./BookingCancellationModal";
import { Button } from "../ui/button";

interface BookingCardProps {
  booking: BookingView;
  onCancel?: (id: string) => void;
  isCancelling?: boolean;
}

const BookingCard = ({ booking, onCancel, isCancelling }: BookingCardProps) => {
  const isConfirmed = booking.status === "Confirmed";

  return (
    <div className="rounded-2xl border border-border/50 bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <DateBadge date={booking.date} month={booking.month} />

          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-base font-semibold text-foreground">
                {booking.title}
              </h3>
              <StatusBadge confirmed={isConfirmed} />
            </div>

            <div className="mt-2 flex items-center gap-6 text-sm text-muted-foreground">
              <InfoItem
                icon={<Clock3 className="h-4 w-4" />}
                value={booking.time}
              />
              <InfoItem
                icon={<CalendarDays className="h-4 w-4" />}
                value={booking.day}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <IndianRupee className="h-4 w-4" />
            <span className="text-sm font-semibold text-foreground">
              {booking.price}
            </span>
          </div>

          {booking.isUpcoming && isConfirmed && (
            <BookingCancellationModal
              bookingId={booking.id}
              bookingTitle={booking.title}
              onConfirm={(id) => onCancel?.(id)}
              trigger={
                <Button variant="destructive" size="sm" disabled={isCancelling}>
                  {isCancelling ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                  Cancel
                </Button>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

function DateBadge({ date, month }: { date: string; month: string }) {
  return (
    <div className="flex h-14 w-14 flex-col items-center justify-center rounded-lg bg-muted">
      <span className="text-lg font-bold">{date}</span>
      <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
        {month}
      </span>
    </div>
  );
}

function InfoItem({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      {icon}
      <span>{value}</span>
    </span>
  );
}

function StatusBadge({ confirmed }: { confirmed: boolean }) {
  return (
    <Badge
      variant={confirmed ? "default" : "outline"}
      className="rounded-full px-2 py-1 text-xs"
    >
      {confirmed ? (
        <CheckCircle2 className="mr-1 h-3.5 w-3.5 text-white" />
      ) : (
        <XCircle className="mr-1 h-3.5 w-3.5" />
      )}
      {confirmed ? "Confirmed" : "Cancelled"}
    </Badge>
  );
}

export default BookingCard;
