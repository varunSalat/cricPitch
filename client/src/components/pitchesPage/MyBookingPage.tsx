import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { pastBookings, upcomingBookings } from "@/data";
import BookingCard from "./BookingCard";

const MyBookingPage = () => {
  return (
    <main className="bg-background px-6 py-10 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
            My Bookings
          </h1>
          <p className="text-sm leading-7 text-muted-foreground">
            Manage and track all your pitch reservations
          </p>
        </div>

        <div className="mt-10">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList>
              <TabsTrigger
                value="upcoming"
                className="rounded-full px-5 py-3 text-sm font-semibold"
              >
                Upcoming
                <span className="ml-2 inline-flex h-6 items-center justify-center rounded-full bg-emerald-100 px-2 text-xs font-semibold text-emerald-700">
                  {upcomingBookings.length}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="rounded-full px-5 py-3 text-sm font-semibold"
              >
                Past & Cancelled
                <span className="ml-2 inline-flex h-6 items-center justify-center rounded-full bg-slate-100 px-2 text-xs font-semibold text-foreground">
                  {pastBookings.length}
                </span>
              </TabsTrigger>
            </TabsList>

            <div className="mt-6 space-y-4">
              <TabsContent value="upcoming">
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="past">
                <div className="space-y-4">
                  {pastBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </main>
  );
};

export default MyBookingPage;
