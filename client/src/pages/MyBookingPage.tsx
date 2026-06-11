import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  cancelBooking,
  fetchMyBookings,
  toBookingView,
  type ApiBooking,
  type BookingView,
} from "@/lib/bookings";
import ErrorComponent from "@/components/general/ErrorComponent";
import BookingCard from "../components/myBookingPage/BookingCard";
import BookingsLoader from "../components/myBookingPage/BookingsLoader";

const MyBookingPage = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, refetch } = useQuery<
    ApiBooking[],
    Error
  >({
    queryKey: ["bookings"],
    queryFn: fetchMyBookings,
    staleTime: 60 * 1000,
  });

  const cancelMutation = useMutation<unknown, Error, string>({
    mutationFn: (bookingId) => cancelBooking(bookingId),
    onSuccess: () => {
      toast.success("Booking cancelled", {
        description: "Your slot has been released and is available again.",
      });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => {
      toast.error("Cancellation failed", { description: err.message });
    },
  });

  const { upcoming, past } = useMemo(() => {
    const bookings: BookingView[] = (data ?? []).map(toBookingView);
    return {
      upcoming: bookings.filter((b) => b.isUpcoming),
      past: bookings.filter((b) => !b.isUpcoming),
    };
  }, [data]);

  return (
    <main className="bg-background px-6 py-10 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="space-y-3">
          <h1 className="text-foreground text-4xl font-bold sm:text-5xl">
            My Bookings
          </h1>
          <p className="text-muted-foreground text-sm leading-7">
            Manage and track all your pitch reservations
          </p>
        </div>

        <div className="mt-10">
          {isLoading ? (
            <BookingsLoader />
          ) : isError ? (
            <ErrorComponent
              message={error?.message || "Failed to load your bookings."}
              onRetry={() => refetch()}
            />
          ) : (
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList>
                <TabsTrigger
                  value="upcoming"
                  className="rounded-full px-5 py-3 text-sm font-semibold"
                >
                  Upcoming
                  <span className="ml-2 inline-flex h-6 items-center justify-center rounded-full bg-emerald-100 px-2 text-xs font-semibold text-emerald-700">
                    {upcoming.length}
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="past"
                  className="rounded-full px-5 py-3 text-sm font-semibold"
                >
                  Past
                  <span className="text-foreground ml-2 inline-flex h-6 items-center justify-center rounded-full bg-slate-100 px-2 text-xs font-semibold">
                    {past.length}
                  </span>
                </TabsTrigger>
              </TabsList>

              <div className="mt-6 space-y-4">
                <TabsContent value="upcoming">
                  <BookingList
                    bookings={upcoming}
                    emptyMessage="You have no upcoming bookings."
                    onCancel={(id) => cancelMutation.mutate(id)}
                    cancellingId={
                      cancelMutation.isPending
                        ? cancelMutation.variables
                        : undefined
                    }
                  />
                </TabsContent>
                <TabsContent value="past">
                  <BookingList
                    bookings={past}
                    emptyMessage="You have no past bookings yet."
                  />
                </TabsContent>
              </div>
            </Tabs>
          )}
        </div>
      </div>
    </main>
  );
};

interface BookingListProps {
  bookings: BookingView[];
  emptyMessage: string;
  onCancel?: (id: string) => void;
  cancellingId?: string;
}

const BookingList = ({
  bookings,
  emptyMessage,
  onCancel,
  cancellingId,
}: BookingListProps) => {
  if (bookings.length === 0) {
    return (
      <div className="flex min-h-[240px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border/60 text-center">
        <p className="text-muted-foreground text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          onCancel={onCancel}
          isCancelling={cancellingId === booking.id}
        />
      ))}
    </div>
  );
};

export default MyBookingPage;
