import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PitchDetailHeroSection from "@/components/pitchDetailsPage/PitchDetailHeroSection";
import SelectDateSection from "@/components/pitchDetailsPage/SelectDateSection";
import AvailableSlotSection from "@/components/pitchDetailsPage/AvailableSlotSection";
import PitchRightContainer from "@/components/pitchDetailsPage/PitchRightContainer";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "@/components/general/AuthModal";
import { useSlots } from "@/hooks/useSlots";

const PitchDetailsPage = () => {
  const { pitchId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  // Socket-driven live slot data
  const { slots, isLoading, error, reserveSlot, unreserveSlot } = useSlots(
    pitchId,
    selectedDate,
  );

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setSelectedSlots([]); // Clear selections on date change
  };

  const handleSlotToggle = (slotId: string) => {
    setSelectedSlots((prev) => (prev.includes(slotId) ? [] : [slotId]));
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
            slots={slots}
            isLoading={isLoading}
            error={error}
            selectedSlots={selectedSlots}
            onSlotToggle={handleSlotToggle}
            reserveSlot={reserveSlot}
            unreserveSlot={unreserveSlot}
          />
        </div>
        {/* Right container */}
        <div className="lg:sticky lg:top-36">
          <PitchRightContainer
            selectedDate={selectedDate}
            selectedSlots={selectedSlots}
            slots={slots}
            reserveSlot={reserveSlot}
          />
        </div>
      </div>

      <AuthModal
        isOpen={!isAuthenticated}
        onClose={() => {
          navigate("/pitches");
        }}
      />
    </main>
  );
};

export default PitchDetailsPage;
