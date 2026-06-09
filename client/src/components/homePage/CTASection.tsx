import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
      <div className="overflow-hidden rounded-[2rem] bg-primary px-6 py-14 text-center text-primary-foreground shadow-[0_25px_90px_rgba(37,147,95,0.22)] sm:px-10 sm:py-16">
        <h2 className="text-3xl font-semibold sm:text-4xl">Ready to Play?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-primary-foreground/85 sm:text-base">
          Book your next cricket session in just a few taps. Available 24/7.
        </p>
        <Link
          to="/pitches"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-card px-8 py-3 text-sm font-semibold text-foreground transition hover:bg-slate-100"
        >
          Find a Pitch
          <span className="ml-3 text-lg">→</span>
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
