import { mockSlots } from "@/data";
import React, { useState } from "react";

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

interface AvailableSlotSectionProps {
  selectedSlots?: string[];
  onSlotToggle?: (slotId: string) => void;
}

const AvailableSlotSection: React.FC<AvailableSlotSectionProps> = ({
  selectedSlots,
  onSlotToggle,
}) => {
  const [localSelectedSlots, setLocalSelectedSlots] = useState<string[]>(["1"]);

  const activeSelectedSlots = selectedSlots || localSelectedSlots;

  const handleSlotClick = (slot: TimeSlot) => {
    if (slot.isBooked) return;

    if (onSlotToggle) {
      onSlotToggle(slot.id);
    } else {
      setLocalSelectedSlots((prev) =>
        prev.includes(slot.id)
          ? prev.filter((id) => id !== slot.id)
          : [...prev, slot.id],
      );
    }
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-2 sm:px-6 lg:px-8">
      <div className="bg-card border-border rounded-3xl border p-6 shadow-xs">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-foreground text-lg font-bold tracking-tight">
            Available Slots
          </h2>

          <div className="flex items-center gap-4 text-sm font-medium">
            <div className="flex items-center gap-2">
              <span className="h-3.5 w-3.5 rounded border border-emerald-300 bg-emerald-100/50" />
              <span className="text-muted-foreground text-xs sm:text-sm">
                Available
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3.5 w-3.5 rounded border border-rose-300 bg-rose-100/50" />
              <span className="text-muted-foreground text-xs sm:text-sm">
                Booked
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {mockSlots.map((slot) => {
            const isSelected = activeSelectedSlots.includes(slot.id);

            return (
              <button
                key={slot.id}
                onClick={() => handleSlotClick(slot)}
                disabled={slot.isBooked}
                className={`relative flex h-[76px] w-full flex-col items-center justify-center rounded-2xl border py-3 transition-all duration-200 ease-in-out select-none ${
                  slot.isBooked
                    ? "text-foreground/45 cursor-not-allowed border-rose-200 bg-rose-50/50 dark:border-rose-900/50 dark:bg-rose-950/20"
                    : isSelected
                      ? "bg-primary shadow-primary/25 cursor-pointer border-transparent text-white shadow-md"
                      : "dark:bg-card/50 dark:border-border text-foreground hover:border-primary/50 hover:bg-primary/[0.04] cursor-pointer border-[#d7e6dd] bg-white hover:shadow-xs"
                }`}
              >
                {isSelected && (
                  <span className="absolute top-2 right-3.5 text-[11px] font-bold text-white">
                    ✓
                  </span>
                )}
                {slot.isBooked && (
                  <span className="absolute top-2 right-3.5 text-[10px] font-bold text-rose-500">
                    ×
                  </span>
                )}

                <span
                  className={`text-sm font-bold tracking-tight sm:text-base ${
                    slot.isBooked ? "text-muted-foreground/50" : ""
                  }`}
                >
                  {slot.startTime}
                </span>
                <span
                  className={`mt-0.5 text-[10px] font-semibold sm:text-xs ${
                    isSelected
                      ? "text-white/80"
                      : slot.isBooked
                        ? "text-muted-foreground/35"
                        : "dark:text-muted-foreground/80 text-[#315c43]/60"
                  }`}
                >
                  to {slot.endTime}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AvailableSlotSection;
