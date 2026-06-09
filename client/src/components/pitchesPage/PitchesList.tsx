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

const pitches = [
  {
    id: "6a280a823a1071f9493aeaac",
    title: "Champions Turf Ground",
    type: "Turf Ground",
    typeStyle: "bg-emerald-100 text-emerald-700 border-emerald-200",
    image:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80",
    price: "1500",
    location: "Green Park Stadium, Block A",
    hours: "6:00 – 22:00",
    tags: ["Floodlights", "Changing Rooms", "Scoreboard"],
    more: 2,
  },
  {
    id: "6a280a823a1071f9493aeaad",
    title: "Striker Box Cricket",
    type: "Box Cricket",
    typeStyle: "bg-amber-100 text-amber-700 border-amber-200",
    image:
      "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=800&q=80",
    price: "800",
    location: "Sports Complex, Sector 12",
    hours: "7:00 – 23:00",
    tags: ["LED Lights", "Seating Area", "Water Cooler"],
    more: 1,
  },
  {
    id: "6a280a823a1071f9493aeaae",
    title: "Elite Indoor Nets",
    type: "Indoor Nets",
    typeStyle: "bg-blue-100 text-blue-700 border-blue-200",
    image:
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80",
    price: "600",
    location: "Indoor Sports Arena, MG Road",
    hours: "6:00 – 22:00",
    tags: ["Bowling Machine", "AC", "Changing Rooms"],
    more: 1,
  },
  {
    id: "6a280a823a1071f9493aeaaf",
    title: "Premier Astro Turf",
    type: "Astro Turf",
    typeStyle: "bg-violet-100 text-violet-700 border-violet-200",
    image:
      "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800&q=80",
    price: "1200",
    location: "City Sports Hub, Ring Road",
    hours: "5:00 – 23:00",
    tags: ["Floodlights", "Pavilion", "Refreshments"],
    more: 2,
  },
  {
    id: "6a280a823a1071f9493aeab0",
    title: "Cement Practice Pitch",
    type: "Cement Pitch",
    typeStyle: "bg-stone-100 text-stone-700 border-stone-200",
    image:
      "https://images.unsplash.com/photo-1594470117722-de4b9a02ebed?w=800&q=80",
    price: "400",
    location: "Municipal Ground, Lake View",
    hours: "6:00 – 20:00",
    tags: ["Basic Lights", "Drinking Water", "Open Parking"],
    more: 0,
  },
];

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
          <a key={pitch.id} className="block group" href={`/book/${pitch.id}`}>
            <div className="bg-card rounded-2xl border border-border/60 overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pitch.image}
                  alt={pitch.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div
                  className={`absolute top-3 left-3 inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors ${pitch.typeStyle}`}
                >
                  {pitch.type}
                </div>
                <div className="absolute bottom-3 right-3 rounded-xl bg-white/95 backdrop-blur-sm px-3 py-1.5 flex items-center gap-1">
                  <IndianRupee className="h-3.5 w-3.5 text-primary" />
                  <span className="font-display font-bold text-foreground">
                    {pitch.price}
                  </span>
                  <span className="text-xs text-muted-foreground">/hr</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                  {pitch.title}
                </h3>
                <div className="mt-2 flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                  <span className="text-sm truncate">{pitch.location}</span>
                </div>
                <div className="mt-1.5 flex items-center gap-1.5 text-muted-foreground">
                  <Clock3 className="h-3.5 w-3.5 flex-shrink-0" />
                  <span className="text-sm">{pitch.hours}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {pitch.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-md bg-muted/60 px-2 py-1 text-xs text-muted-foreground"
                    >
                      <Zap className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                  {pitch.more > 0 ? (
                    <span className="text-xs font-medium text-primary px-2 py-1">
                      +{pitch.more} more
                    </span>
                  ) : null}
                </div>
                <button className="mt-4 h-9 w-full rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition hover:bg-primary/90">
                  Book Now
                </button>
              </div>
            </div>
          </a>
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
