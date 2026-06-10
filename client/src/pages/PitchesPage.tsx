import { useState } from "react";
import PitchesList from "@/components/pitchesPage/PitchesList";
import PitchesPageHeader from "@/components/pitchesPage/PitchesPageHeader";
import useDebounce from "@/hooks/useDebounce";

const PitchesPage = () => {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 400);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    setPage(1);
  };

  const handleSortChange = (newSortBy: string, newSortOrder: "asc" | "desc") => {
    setSortBy(newSortBy);
    setPage(1);
    setSortOrder(newSortOrder);
  };

  return (
    <main>
      <PitchesPageHeader
        search={search}
        onSearch={handleSearch}
        selectedType={selectedType}
        onTypeChange={handleTypeChange}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
      />
      <section className="bg-background px-6 pb-16 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <PitchesList
            search={debouncedSearch}
            type={selectedType}
            sortBy={sortBy}
            sortOrder={sortOrder}
            page={page}
            onPageChange={setPage}
          />
        </div>
      </section>
    </main>
  );
};

export default PitchesPage;
