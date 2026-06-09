import { useMemo, useState } from "react";
import { Clock3, IndianRupee, MapPin, Zap } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { pitches } from "@/data/pitches";

const PAGE_SIZE = 3;

const PitchesList = () => {
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(pitches.length / PAGE_SIZE);

  const currentPitches = useMemo(
    () => pitches.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [page],
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {currentPitches.map((pitch) => (
          <Link
            key={pitch.id}
            className="group block h-full"
            to={`/pitches/${pitch.id}`}
          >
            <div className="bg-card border-border/60 hover:shadow-primary/5 flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pitch.image}
                  alt={pitch.title}
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
                    {pitch.price}
                  </span>
                  <span className="text-muted-foreground text-xs">/hr</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-4 p-5">
                <div className="space-y-3">
                  <h3 className="text-foreground group-hover:text-primary text-lg font-bold transition-colors">
                    {pitch.title}
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
                    {pitch.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-muted/60 text-muted-foreground inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs"
                      >
                        <Zap className="h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                    {pitch.more > 0 ? (
                      <span className="text-primary px-2 py-1 text-xs font-medium">
                        +{pitch.more} more
                      </span>
                    ) : null}
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

      <Pagination className="mt-10">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              aria-disabled={page === 1}
              onClick={(event) => {
                event.preventDefault();
                if (page > 1) {
                  setPage((current) => current - 1);
                }
              }}
            />
          </PaginationItem>

          {Array.from({ length: pageCount }, (_, index) => {
            const pageNumber = index + 1;
            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href="#"
                  isActive={pageNumber === page}
                  onClick={(event) => {
                    event.preventDefault();
                    setPage(pageNumber);
                  }}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              aria-disabled={page === pageCount}
              onClick={(event) => {
                event.preventDefault();
                if (page < pageCount) {
                  setPage((current) => current + 1);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default PitchesList;
