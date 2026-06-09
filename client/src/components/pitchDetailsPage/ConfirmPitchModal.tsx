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
      // Reset the success state after the dialog exit animation finishes
      setTimeout(() => setIsSuccess(false), 300);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px] rounded-3xl p-6">
        {!isSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold tracking-tight">Confirm Your Booking</DialogTitle>
              <DialogDescription className="text-sm font-medium text-muted-foreground mt-1">
                Please review your booking details before confirming.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-5 py-5">
              <div className="flex justify-between items-center">
                <span className="font-medium text-muted-foreground text-sm">Pitch</span>
                <span className="font-bold text-sm">{pitchName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-muted-foreground text-sm">Date</span>
                <span className="font-bold text-sm">{selectedDate}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="font-medium text-muted-foreground text-sm">Time Slots</span>
                <div className="flex flex-col items-end gap-1 text-sm font-bold">
                  {selectedSlots.map((slot, index) => (
                    <span key={index}>{slot}</span>
                  ))}
                </div>
              </div>
              <hr className="border-border/80" />
              <div className="flex justify-between items-center">
                <span className="font-bold text-muted-foreground">Total Price</span>
                <span className="text-xl font-bold text-foreground">
                  ₹ {totalPrice.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
            <DialogFooter className="flex flex-row gap-3 sm:justify-end mt-2">
              <button
                onClick={() => handleOpenChange(false)}
                className="px-5 py-2.5 rounded-xl font-bold text-muted-foreground hover:bg-muted transition-colors cursor-pointer w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsSuccess(true)}
                className="px-5 py-2.5 rounded-xl font-bold text-white bg-primary hover:bg-primary/90 transition-colors shadow-md shadow-primary/20 cursor-pointer w-full sm:w-auto"
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
                at{" "}
                <strong>{selectedSlots.join(", ")}</strong>{" "}
                have been locked and booked successfully.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-2 sm:justify-center">
              <button
                onClick={() => handleOpenChange(false)}
                className="bg-primary hover:bg-primary/90 cursor-pointer rounded-lg px-6 py-2.5 font-bold text-white"
              >
                Awesome!
              </button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmPitchModal;
