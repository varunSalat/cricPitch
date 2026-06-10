import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const filters = [
  "All Types",
  "Turf Ground",
  "Box Cricket",
  "Indoor Nets",
  "Astro Turf",
  "Cement Pitch",
];

interface PitchesPageHeaderProps {
  search: string;
  onSearch: (value: string) => void;
  selectedType: string;
  onTypeChange: (value: string) => void;
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSortChange: (sortBy: string, sortOrder: "asc" | "desc") => void;
}

const PitchesPageHeader = ({
  search,
  onSearch,
  selectedType,
  onTypeChange,
  sortBy,
  sortOrder,
  onSortChange,
}: PitchesPageHeaderProps) => {
  // Combine sortBy and sortOrder into a single value for select options
  const selectValue = `${sortBy}-${sortOrder}`;

  const handleSelectChange = (value: string) => {
    const [newSortBy, newSortOrder] = value.split("-") as [
      string,
      "asc" | "desc",
    ];
    onSortChange(newSortBy, newSortOrder);
  };

  return (
    <section className="bg-background px-6 py-10 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
              Cricket Pitches
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Find and book the perfect venue for your game
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <label className="relative block flex-1">
            <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2" />
            <input
              id="pitch-search"
              type="search"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search by name..."
              className="border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 w-full rounded-2xl border py-4 pr-4 pl-12 text-sm focus:ring-2 focus:outline-none"
            />
          </label>

          <div className="border-border bg-card text-foreground flex items-center rounded-2xl border px-3 py-2.5 text-sm font-medium shadow-sm">
            <span className="text-muted-foreground mr-2 whitespace-nowrap">
              Sort by:
            </span>
            <Select value={selectValue} onValueChange={handleSelectChange}>
              <SelectTrigger className="text-foreground h-auto cursor-pointer border-none bg-transparent p-0 py-0 font-semibold select-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="createdAt-desc" className="cursor-pointer">
                  Newest First
                </SelectItem>
                <SelectItem value="createdAt-asc" className="cursor-pointer">
                  Oldest First
                </SelectItem>
                <SelectItem value="name-asc" className="cursor-pointer">
                  Alphabetical (A-Z)
                </SelectItem>
                <SelectItem value="name-desc" className="cursor-pointer">
                  Alphabetical (Z-A)
                </SelectItem>
                <SelectItem value="pricePerHour-asc" className="cursor-pointer">
                  Price: Low to High
                </SelectItem>
                <SelectItem
                  value="pricePerHour-desc"
                  className="cursor-pointer"
                >
                  Price: High to Low
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {filters.map((filter) => {
            const filterValue = filter === "All Types" ? "" : filter;
            const isActive = selectedType === filterValue;
            return (
              <button
                key={filter}
                onClick={() => onTypeChange(filterValue)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground font-medium"
                    : "border-border bg-card text-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PitchesPageHeader;
