import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="overflow-hidden bg-background py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-8 animate-hero-text">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              Live Slot Availability
            </div>
            <div className="space-y-6">
              <h1 className="max-w-3xl text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                Book Your <span className="text-primary">Cricket Pitch</span> in
                Seconds
              </h1>
              <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                Find and reserve the perfect cricket ground near you. Real-time
                availability, instant booking, zero conflicts.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                to="/pitches"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90"
              >
                Browse Pitches
              </Link>
              <Link
                to="/bookings"
                className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
              >
                My Bookings
              </Link>
            </div>
          </div>
        </div>
        <div className="relative mt-12 animate-hero-card">
          <div className="hero-gradient absolute inset-0 rounded-[2rem] opacity-90" />
          <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-2xl shadow-black/10">
            <img
              src={"/homePage/heroImg.jpg"}
              alt="Cricket pitch"
              className="h-[250px] w-full object-cover sm:h-[420px]"
            />
          </div>
          <div className="pointer-events-none absolute -bottom-8 right-6 hidden h-24 w-24 rounded-full bg-primary/15 blur-3xl md:block" />
          <div className="pointer-events-none absolute top-10 left-6 hidden h-16 w-16 rounded-full bg-secondary/15 blur-3xl md:block" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
