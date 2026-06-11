import { Skeleton } from "@/components/ui/skeleton";

const BookingCardSkeleton = () => (
  <div className="rounded-2xl border border-border/50 bg-card p-4 shadow-sm">
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Skeleton className="h-14 w-14 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-48 rounded-md" />
          <div className="flex items-center gap-6">
            <Skeleton className="h-4 w-28 rounded-md" />
            <Skeleton className="h-4 w-24 rounded-md" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Skeleton className="h-4 w-16 rounded-md" />
        <Skeleton className="h-9 w-24 rounded-md" />
      </div>
    </div>
  </div>
);

const BookingsLoader = () => (
  <div className="space-y-4">
    {Array.from({ length: 3 }).map((_, i) => (
      <BookingCardSkeleton key={i} />
    ))}
  </div>
);

export default BookingsLoader;
