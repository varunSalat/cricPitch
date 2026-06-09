import { useState } from "react";
import PitchDetailHeroSection from "@/components/pitchDetailsPage/PitchDetailHeroSection";
import SelectDateSection from "@/components/pitchDetailsPage/SelectDateSection";
import AvailableSlotSection from "@/components/pitchDetailsPage/AvailableSlotSection";
import PitchRightContainer from "@/components/pitchDetailsPage/PitchRightContainer";

const PitchDetailsPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlots, setSelectedSlots] = useState<string[]>(["1"]); // Default matching 6:00 AM slot

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setSelectedSlots([]); // Clear slots on date change
  };

  const handleSlotToggle = (slotId: string) => {
    setSelectedSlots((prev) =>
      prev.includes(slotId)
        ? prev.filter((id) => id !== slotId)
        : [...prev, slotId],
    );
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-8">
        {/* Left container */}
        <div className="flex flex-col gap-6 xl:gap-8">
          <PitchDetailHeroSection />
          <SelectDateSection
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
          />
          <AvailableSlotSection
            selectedSlots={selectedSlots}
            onSlotToggle={handleSlotToggle}
          />
        </div>
        {/* Right container */}
        <div className="lg:sticky lg:top-36">
          <PitchRightContainer
            selectedDate={selectedDate}
            selectedSlots={selectedSlots}
          />
        </div>
      </div>
    </main>
  );
};

export default PitchDetailsPage;
