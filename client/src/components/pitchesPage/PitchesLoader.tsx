import { Skeleton } from "@/components/ui/skeleton";

const PAGE_SIZE = 9;

const PitchCardSkeleton = () => (
  <div className="bg-card border-border/60 flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm">
    {/* Image area */}
    <Skeleton className="h-48 w-full rounded-none" />

    <div className="flex flex-1 flex-col gap-4 p-5">
      <div className="space-y-3">
        {/* Title */}
        <Skeleton className="h-5 w-3/4 rounded-md" />

        {/* Location row */}
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-3.5 w-3.5 shrink-0 rounded-full" />
          <Skeleton className="h-3.5 w-1/2 rounded-md" />
        </div>

        {/* Hours row */}
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-3.5 w-3.5 shrink-0 rounded-full" />
          <Skeleton className="h-3.5 w-1/3 rounded-md" />
        </div>

        {/* Tag pills */}
        <div className="flex flex-wrap gap-1.5">
          {[80, 64, 72].map((w) => (
            <Skeleton key={w} className="h-6 rounded-md" style={{ width: w }} />
          ))}
        </div>
      </div>

      {/* CTA button */}
      <div className="mt-auto">
        <Skeleton className="h-9 w-full rounded-md" />
      </div>
    </div>
  </div>
);

const PitchesListSkeleton = () => (
  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: PAGE_SIZE }).map((_, i) => (
      <PitchCardSkeleton key={i} />
    ))}
  </div>
);

export default PitchesListSkeleton;
