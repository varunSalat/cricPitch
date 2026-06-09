import { Search, SlidersHorizontal } from "lucide-react";

const filters = [
  "All Types",
  "Turf Ground",
  "Box Cricket",
  "Indoor Nets",
  "Astro Turf",
  "Cement Pitch",
];

const PitchesPageHeader = () => {
  return (
    <section className="bg-background px-6 py-10 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Cricket Pitches
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              5 venues available for booking
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground shadow-sm transition hover:border-primary hover:text-primary">
            <SlidersHorizontal className="h-4 w-4" />
            Filter
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-[1fr_auto]">
          <label className="relative block w-full">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search by name or location..."
              className="w-full rounded-2xl border border-border bg-card py-4 pl-12 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </label>
          <div className="hidden rounded-2xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground shadow-sm sm:flex sm:items-center">
            <span className="text-muted-foreground">Sort by:</span>
            <span className="ml-2 rounded-full bg-primary px-3 py-1 text-primary-foreground">
              Recommended
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {filters.map((filter, index) => (
            <button
              key={`${filter}-${index}`}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                filter === "All Types"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PitchesPageHeader;
