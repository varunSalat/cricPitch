import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ConfirmPitchModal from "./ConfirmPitchModal";
import { Calendar, Clock, MapPin, ShieldCheck } from "lucide-react";
import { pitches } from "@/data/pitches";
import type { Slot } from "@/hooks/useSlots";

interface PitchRightContainerProps {
  selectedDate: Date;
  selectedSlots: string[];
  slots: Slot[];
  reserveSlot: (slotId: string) => Promise<unknown>;
}

const PitchRightContainer: React.FC<PitchRightContainerProps> = ({
  selectedDate,
  selectedSlots,
  slots,
}) => {
  const { pitchId } = useParams();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const pitch = pitches.find((p) => p.id === pitchId);

  if (!pitch) return null;

  const hasSelectedSlots = selectedSlots.length > 0;

  const formatFullDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // Use live socket slots for details
  const selectedSlotDetails = slots.filter((slot) =>
    selectedSlots.includes(slot.id),
  );

  const hourlyRate = Number(pitch.price);
  const totalPrice = hourlyRate * selectedSlots.length;

  if (!hasSelectedSlots) {
    return (
      <div className="bg-card border-border flex h-[240px] flex-col items-center justify-center rounded-3xl border p-8 text-center shadow-xs">
        <div className="bg-muted text-muted-foreground/50 mb-4 flex h-16 w-16 items-center justify-center rounded-full">
          <Clock className="h-7 w-7" />
        </div>
        <h3 className="text-foreground mb-1.5 text-base font-bold">
          Select a Time Slot
        </h3>
        <p className="text-muted-foreground max-w-[190px] text-xs leading-relaxed font-medium">
          Choose a date and available slot to proceed
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border-border flex flex-col rounded-3xl border p-6 shadow-xs">
      <h3 className="text-foreground mb-5 text-base font-bold tracking-tight">
        Booking Summary
      </h3>

      {/* Details list */}
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/20">
            <MapPin className="h-[18px] w-[18px] text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-foreground text-sm leading-tight font-bold">
              {pitch.title}
            </span>
            <span className="text-muted-foreground mt-0.5 text-xs">
              {pitch.location}
            </span>
          </div>
        </div>

        {/* Selected date */}
        <div className="flex items-center gap-3.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/20">
            <Calendar className="h-[18px] w-[18px] text-emerald-600 dark:text-emerald-400" />
          </div>
          <span className="text-foreground text-sm font-bold">
            {formatFullDate(selectedDate)}
          </span>
        </div>

        {/* Selected time slots */}
        <div className="flex items-start gap-3.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/20">
            <Clock className="h-[18px] w-[18px] text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex flex-col gap-1.5 pt-1">
            {selectedSlotDetails.map((slot) => (
              <span key={slot.id} className="text-foreground text-sm font-bold">
                {slot.startTime} – {slot.endTime}
              </span>
            ))}
          </div>
        </div>
      </div>

      <hr className="border-border/80 my-5" />

      {/* Pricing */}
      <div className="mb-5 flex items-center justify-between">
        <span className="text-muted-foreground text-sm font-semibold">
          {selectedSlots.length > 1
            ? `Total Price (${selectedSlots.length} hrs)`
            : "Price per hour"}
        </span>
        <span className="text-foreground text-xl font-bold">
          ₹ {totalPrice.toLocaleString("en-IN")}
        </span>
      </div>

      {/* Confirm Booking trigger */}
      <button
        onClick={() => setIsConfirmModalOpen(true)}
        className="bg-primary hover:bg-primary/90 shadow-primary/20 w-full cursor-pointer rounded-xl px-4 py-3.5 text-center text-sm font-bold text-white shadow-md transition-all duration-200 select-none active:translate-y-px"
      >
        Confirm Booking
      </button>

      <ConfirmPitchModal
        isOpen={isConfirmModalOpen}
        onOpenChange={setIsConfirmModalOpen}
        pitchName={pitch.title}
        selectedDate={formatFullDate(selectedDate)}
        rawDate={selectedDate}
        selectedSlots={selectedSlotDetails.map(
          (s) => `${s.startTime} – ${s.endTime}`,
        )}
        selectedSlotIds={selectedSlots}
        totalPrice={totalPrice}
      />

      {/* Trust subtext */}
      <div className="text-muted-foreground/80 mt-3 flex items-center justify-center gap-1.5">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
        <span className="text-[11px] font-medium">
          Instant confirmation · No hidden charges
        </span>
      </div>
    </div>
  );
};

export default PitchRightContainer;
