import { Clock3, IndianRupee, MapPin, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { publicFetch } from "@/lib/fetchAPI";
import { useQuery } from "@tanstack/react-query";
import ErrorComponent from "@/components/general/ErrorComponent";
import PitchesListSkeleton from "./PitchesLoader";
import PaginationComponent from "@/components/general/PaginationComponent";

const PAGE_SIZE = 9;

interface Pitch {
  id: string;
  name: string;
  type: string;
  typeStyle: string;
  image: string;
  location: string;
  hours: string;
  tags: string[];
  pricePerHour: string;
}

interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface PitchesResponse {
  data: Pitch[];
  pagination: PaginationMeta;
}

interface PitchesListProps {
  search: string;
  type: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
  page: number;
  onPageChange: (page: number) => void;
}

const fetchPitches = (
  page: number,
  search: string,
  type: string,
  sortBy: string,
  sortOrder: "asc" | "desc",
): Promise<PitchesResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(PAGE_SIZE),
  });
  if (search.trim()) params.set("name", search.trim());
  if (type) params.set("type", type);
  if (sortBy) params.set("sortBy", sortBy);
  if (sortOrder) params.set("sortOrder", sortOrder);

  return publicFetch(`/pitches?${params.toString()}`).then((res) => res.data);
};

const PitchesList = ({
  search,
  type,
  sortBy,
  sortOrder,
  page,
  onPageChange,
}: PitchesListProps) => {
  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery<
    PitchesResponse,
    Error
  >({
    queryKey: ["pitches", page, search, type, sortBy, sortOrder],
    queryFn: () => fetchPitches(page, search, type, sortBy, sortOrder),
    staleTime: 60 * 1000, // 1 minute
    placeholderData: (prev) => prev, // keep previous page visible while next loads
  });

  if (isLoading || isRefetching) return <PitchesListSkeleton />;

  if (isError) {
    return (
      <ErrorComponent
        message={error.message || "Failed to load pitches."}
        onRetry={() => refetch()}
      />
    );
  }

  const pitches = data?.data ?? [];
  const totalPages = data?.pagination.totalPages ?? 1;

  if (pitches.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-2 text-center">
        <p className="text-foreground text-lg font-semibold">
          No pitches found
        </p>
        <p className="text-muted-foreground text-sm">
          Try a different search term or clear your filters.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {pitches.map((pitch) => (
          <Link
            key={pitch.id}
            className="group block h-full"
            to={`/pitches/${pitch.id}`}
          >
            <div className="bg-card border-border/60 hover:shadow-primary/5 flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pitch.image}
                  alt={pitch.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div
                  className={`absolute top-3 left-3 inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors ${pitch.typeStyle}`}
                >
                  {pitch.type}
                </div>
                <div className="absolute right-3 bottom-3 flex items-center gap-1 rounded-xl bg-white/95 px-3 py-1.5 backdrop-blur-sm">
                  <IndianRupee className="text-primary h-3.5 w-3.5" />
                  <span className="font-display text-foreground font-bold">
                    {pitch.pricePerHour}
                  </span>
                  <span className="text-muted-foreground text-xs">/hr</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-4 p-5">
                <div className="space-y-3">
                  <h3 className="text-foreground group-hover:text-primary text-lg font-bold transition-colors">
                    {pitch.name}
                  </h3>
                  <div className="text-muted-foreground flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="truncate text-sm">{pitch.location}</span>
                  </div>
                  <div className="text-muted-foreground flex items-center gap-1.5">
                    <Clock3 className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="text-sm">{pitch.hours}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {pitch.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-muted/60 text-muted-foreground inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs"
                      >
                        <Zap className="h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                    {pitch.tags.length > 3 && (
                      <span className="text-primary px-2 py-1 text-xs font-medium">
                        +{pitch.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-auto">
                  <Button className="w-full">Book Now</Button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <PaginationComponent
        currentPage={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default PitchesList;
