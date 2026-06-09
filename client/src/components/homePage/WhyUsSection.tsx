import { MapPin, Clock3, ShieldCheck, Star } from "lucide-react";

const features = [
  {
    title: "Multiple Venues",
    description:
      "Choose from turf, box cricket, indoor nets, and more across the city.",
    icon: MapPin,
  },
  {
    title: "Real-Time Availability",
    description:
      "See live slot availability and book instantly without conflicts.",
    icon: Clock3,
  },
  {
    title: "Guaranteed Booking",
    description:
      "Concurrency-safe system ensures your slot is locked the moment you book.",
    icon: ShieldCheck,
  },
  {
    title: "Instant Confirmation",
    description:
      "Get immediate confirmation with all booking details at your fingertips.",
    icon: Star,
  },
];

const WhyUsSection = () => {
  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl ">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Why Choose CricPitch?
          </p>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
            Everything you need to find, book, and enjoy your perfect cricket
            session.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group rounded-3xl border border-border/80 bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
