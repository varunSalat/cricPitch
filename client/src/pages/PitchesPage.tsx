import PitchesList from "@/components/pitchesPage/PitchesList";
import PitchesPageHeader from "@/components/pitchesPage/PitchesPageHeader";

const PitchesPage = () => {
  return (
    <main>
      <PitchesPageHeader />
      <section className="bg-background px-6 pb-16 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <PitchesList />
        </div>
      </section>
    </main>
  );
};

export default PitchesPage;
