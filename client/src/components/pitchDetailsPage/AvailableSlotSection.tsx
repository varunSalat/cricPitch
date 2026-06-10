import React, { useState } from "react";
import type { Slot } from "@/hooks/useSlots";
import { Loader2, WifiOff } from "lucide-react";
import { toast } from "sonner";

interface AvailableSlotSectionProps {
  slots: Slot[];
  isLoading: boolean;
  error: string | null;
  selectedSlots?: string[];
  onSlotToggle?: (slotId: string) => void;
  reserveSlot?: (slotId: string) => Promise<unknown>;
  unreserveSlot?: (slotId: string) => void;
}

const AvailableSlotSection: React.FC<AvailableSlotSectionProps> = ({
  slots,
  isLoading,
  error,
  selectedSlots = [],
  onSlotToggle,
  reserveSlot,
  unreserveSlot,
}) => {
  const [reservingSlotId, setReservingSlotId] = useState<string | null>(null);

  const handleSlotClick = async (slot: Slot) => {
    if (
      slot.status === "BOOKED" ||
      (slot.status === "RESERVED" && !slot.isReservedByMe)
    )
      return;

    // If already selected, clicking it again will unreserve it
    if (selectedSlots.includes(slot.id)) {
      unreserveSlot?.(slot.id);
      onSlotToggle?.(slot.id);
      return;
    }

    // Try to reserve it via socket if it's AVAILABLE
    if (slot.status === "AVAILABLE" && reserveSlot) {
      setReservingSlotId(slot.id);
      try {
        await reserveSlot(slot.id);

        // Since it's a single select, unreserve the previously selected slot (if any)
        if (selectedSlots.length > 0 && unreserveSlot) {
          unreserveSlot(selectedSlots[0]);
        }
      } catch (err) {
        toast.error("Failed to reserve slot", {
          description: err instanceof Error ? err.message : "Unknown error",
        });
        setReservingSlotId(null);
        return; // Don't toggle selection if reservation failed
      }
      setReservingSlotId(null);
    }

    onSlotToggle?.(slot.id);
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
              <span className="h-3.5 w-3.5 rounded border border-amber-300 bg-amber-100/50" />
              <span className="text-muted-foreground text-xs sm:text-sm">
                Reserved
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

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-muted/50 border-border flex h-[76px] animate-pulse items-center justify-center rounded-2xl border"
              >
                <Loader2 className="text-muted-foreground/30 h-5 w-5 animate-spin" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="flex h-[200px] flex-col items-center justify-center gap-3">
            <WifiOff className="text-muted-foreground/40 h-10 w-10" />
            <p className="text-muted-foreground text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && slots.length === 0 && (
          <div className="flex h-[200px] flex-col items-center justify-center gap-2">
            <p className="text-muted-foreground text-sm font-medium">
              No slots available for this date.
            </p>
          </div>
        )}

        {/* Slots Grid */}
        {!isLoading && !error && slots.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {slots.map((slot) => {
              const isSelected = selectedSlots.includes(slot.id);
              const isReserved = slot.status === "RESERVED";
              const isBooked = slot.status === "BOOKED";
              const isDisabled =
                isBooked || (isReserved && !slot.isReservedByMe);

              return (
                <button
                  key={slot.id}
                  onClick={() => handleSlotClick(slot)}
                  disabled={isDisabled}
                  className={`relative flex h-[76px] w-full flex-col items-center justify-center rounded-2xl border py-3 transition-all duration-200 ease-in-out select-none ${
                    isBooked
                      ? "text-foreground/45 cursor-not-allowed border-rose-200 bg-rose-50/50 dark:border-rose-900/50 dark:bg-rose-950/20"
                      : isReserved && !slot.isReservedByMe
                        ? "text-foreground/45 cursor-not-allowed border-amber-200 bg-amber-50/50 dark:border-amber-900/50 dark:bg-amber-950/20"
                        : isSelected || (isReserved && slot.isReservedByMe)
                          ? "bg-primary shadow-primary/25 cursor-pointer border-transparent text-white shadow-md"
                          : "dark:bg-card/50 dark:border-border text-foreground hover:border-primary/50 hover:bg-primary/[0.04] cursor-pointer border-[#d7e6dd] bg-white hover:shadow-xs"
                  }`}
                >
                  {/* Status indicators */}
                  {reservingSlotId === slot.id ? (
                    <span className="absolute top-2 right-3.5">
                      <Loader2 className="text-primary h-3 w-3 animate-spin" />
                    </span>
                  ) : isSelected || (isReserved && slot.isReservedByMe) ? (
                    <span className="absolute top-2 right-3.5 text-[11px] font-bold text-white">
                      ✓
                    </span>
                  ) : null}
                  {isBooked && (
                    <span className="absolute top-2 right-3.5 text-[10px] font-bold text-rose-500">
                      ×
                    </span>
                  )}
                  {isReserved && !slot.isReservedByMe && (
                    <span className="absolute top-2 right-3.5 text-[10px] font-bold text-amber-500">
                      ⏳
                    </span>
                  )}

                  <span
                    className={`text-sm font-bold tracking-tight sm:text-base ${
                      isDisabled ? "text-muted-foreground/50" : ""
                    }`}
                  >
                    {slot.startTime}
                  </span>
                  <span
                    className={`mt-0.5 text-[10px] font-semibold sm:text-xs ${
                      isSelected || (isReserved && slot.isReservedByMe)
                        ? "text-white/80"
                        : isDisabled
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
        )}
      </div>
    </section>
  );
};

export default AvailableSlotSection;
