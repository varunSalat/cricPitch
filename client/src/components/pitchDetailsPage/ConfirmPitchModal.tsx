import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ShieldCheck } from "lucide-react";
import { Button } from "../ui/button";

interface ConfirmPitchModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  pitchName: string;
  selectedDate: string;
  rawDate: Date;
  selectedSlots: string[];
  totalPrice: number;
}

const ConfirmPitchModal: React.FC<ConfirmPitchModalProps> = ({
  isOpen,
  onOpenChange,
  pitchName,
  selectedDate,
  rawDate,
  selectedSlots,
  totalPrice,
}) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      setTimeout(() => setIsSuccess(false), 300);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="rounded-3xl p-6 sm:max-w-[425px]">
        {!isSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold tracking-tight">
                Confirm Your Booking
              </DialogTitle>
              <DialogDescription className="text-muted-foreground mt-1 text-sm font-medium">
                Please review your booking details before confirming.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-5 py-5">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm font-medium">
                  Pitch
                </span>
                <span className="text-sm font-bold">{pitchName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm font-medium">
                  Date
                </span>
                <span className="text-sm font-bold">{selectedDate}</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-muted-foreground text-sm font-medium">
                  Time Slots
                </span>
                <div className="flex flex-col items-end gap-1 text-sm font-bold">
                  {selectedSlots.map((slot, index) => (
                    <span key={index}>{slot}</span>
                  ))}
                </div>
              </div>
              <hr className="border-border/80" />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground font-bold">
                  Total Price
                </span>
                <span className="text-foreground text-xl font-bold">
                  ₹ {totalPrice.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
            <DialogFooter className="mt-2 flex flex-row gap-3 sm:justify-end">
              <button
                onClick={() => handleOpenChange(false)}
                className="text-muted-foreground hover:bg-muted w-full cursor-pointer rounded-xl px-5 py-2.5 font-bold transition-colors sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsSuccess(true)}
                className="bg-primary hover:bg-primary/90 shadow-primary/20 w-full cursor-pointer rounded-xl px-5 py-2.5 font-bold text-white shadow-md transition-colors sm:w-auto"
              >
                Confirm & Pay
              </button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/35">
                <ShieldCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <DialogTitle className="w-full text-center text-lg font-bold">
                Booking Confirmed!
              </DialogTitle>
              <DialogDescription className="mt-2 text-center text-sm leading-relaxed">
                Your slot{selectedSlots.length > 1 ? "s" : ""} for{" "}
                <strong>{pitchName}</strong> on{" "}
                <strong>
                  {rawDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </strong>{" "}
                at <strong>{selectedSlots.join(", ")}</strong> have been locked
                and booked successfully.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-2 sm:justify-center">
              <Button onClick={() => handleOpenChange(false)}>Close</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmPitchModal;
