import React, { useRef, useState, useEffect } from "react";

interface DateItem {
  date: Date;
  dayLabel: string;
  dayNumber: string;
  monthLabel: string;
  formattedDate: string;
}

interface SelectDateSectionProps {
  selectedDate?: Date;
  onDateChange?: (date: Date) => void;
}

const getDatesList = (): DateItem[] => {
  const datesList: DateItem[] = [];
  const today = new Date();

  for (let i = 0; i < 14; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);

    const dayLabel =
      i === 0
        ? "TODAY"
        : nextDate
            .toLocaleDateString("en-US", { weekday: "short" })
            .toUpperCase();

    const dayNumber = nextDate.getDate().toString();
    const monthLabel = nextDate.toLocaleDateString("en-US", { month: "short" });
    const formattedDate = nextDate.toISOString().split("T")[0];

    datesList.push({
      date: nextDate,
      dayLabel,
      dayNumber,
      monthLabel,
      formattedDate,
    });
  }
  return datesList;
};

const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

const SelectDateSection: React.FC<SelectDateSectionProps> = ({
  selectedDate,
  onDateChange,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [localSelectedDate, setLocalSelectedDate] = useState<Date>(new Date());
  const [scrollProgress, setScrollProgress] = useState(0);
  const [thumbWidthPercent, setThumbWidthPercent] = useState(30);

  const dates = getDatesList();
  const activeDate = selectedDate || localSelectedDate;

  const handleDateSelect = (date: Date) => {
    if (onDateChange) {
      onDateChange(date);
    } else {
      setLocalSelectedDate(date);
    }
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
      setScrollProgress(progress);

      const viewPercent =
        scrollWidth > 0 ? (clientWidth / scrollWidth) * 100 : 30;
      setThumbWidthPercent(Math.max(10, Math.min(100, viewPercent)));
    }
  };

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: -240, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: 240, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleScroll();
    }, 50);

    window.addEventListener("resize", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-2 sm:px-6 lg:px-8">
      <div className="bg-card border-border rounded-3xl border p-6 shadow-xs">
        <h2 className="text-foreground mb-5 text-lg font-bold tracking-tight">
          Select Date
        </h2>

        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth pb-1"
        >
          {dates.map((item) => {
            const isSelected = isSameDay(item.date, activeDate);
            return (
              <button
                key={item.formattedDate}
                onClick={() => handleDateSelect(item.date)}
                className={`flex h-[120px] w-[84px] shrink-0 cursor-pointer flex-col items-center justify-between rounded-2xl border py-4 transition-all duration-200 select-none ${
                  isSelected
                    ? "bg-primary shadow-primary/25 border-transparent text-white shadow-md"
                    : "dark:bg-card/50 dark:border-border text-foreground hover:border-primary/50 hover:bg-primary/[0.02] border-[#d7e6dd] bg-white"
                }`}
              >
                <span
                  className={`text-[10px] font-bold tracking-wider ${
                    isSelected
                      ? "text-white/80"
                      : "dark:text-muted-foreground text-[#315c43]/60"
                  }`}
                >
                  {item.dayLabel}
                </span>
                <span className="text-3xl font-extrabold tracking-tight">
                  {item.dayNumber}
                </span>
                <span
                  className={`text-xs font-semibold ${
                    isSelected
                      ? "text-white/80"
                      : "dark:text-muted-foreground text-[#315c43]/60"
                  }`}
                >
                  {item.monthLabel}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={scrollLeft}
            className="text-muted-foreground/60 hover:text-muted-foreground flex h-6 w-6 cursor-pointer items-center justify-center transition select-none hover:opacity-85"
            aria-label="Scroll left"
          >
            <svg className="h-2.5 w-2.5 fill-current" viewBox="0 0 100 100">
              <polygon points="100,0 0,50 100,100" />
            </svg>
          </button>

          <div className="bg-muted dark:bg-muted/20 relative h-[6px] flex-1 overflow-hidden rounded-full">
            <div
              className="bg-muted-foreground/35 dark:bg-muted-foreground/50 absolute top-0 h-full rounded-full transition-all duration-75"
              style={{
                width: `${thumbWidthPercent}%`,
                left: `${scrollProgress * (100 - thumbWidthPercent)}%`,
              }}
            />
          </div>

          <button
            onClick={scrollRight}
            className="text-muted-foreground/60 hover:text-muted-foreground flex h-6 w-6 cursor-pointer items-center justify-center transition select-none hover:opacity-85"
            aria-label="Scroll right"
          >
            <svg className="h-2.5 w-2.5 fill-current" viewBox="0 0 100 100">
              <polygon points="0,0 100,50 0,100" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SelectDateSection;
