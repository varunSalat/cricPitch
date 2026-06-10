import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock3, IndianRupee, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { pitches } from "@/data/pitches";
import { useEffect, useState } from "react";

const PitchDetailHeroSection = () => {
  const { pitchId } = useParams();
  const pitch = pitches.find((item) => item.id === pitchId);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY * 0.2);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!pitch) {
    return (
      <div className="text-muted-foreground mx-auto max-w-6xl px-4 py-20 text-center text-sm">
        Pitch not found.
      </div>
    );
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="text-muted-foreground mb-4 text-sm">
        <Link
          to="/pitches"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Pitches
        </Link>
      </div>

      <div className="bg-card overflow-hidden rounded-3xl shadow-sm">
        <div className="relative h-[420px] overflow-hidden rounded-3xl sm:h-[480px]">
          <img
            src={pitch.image}
            alt={pitch.title}
            className="absolute -top-[20%] left-0 h-[140%] w-full object-cover will-change-transform"
            style={{ transform: `translateY(${offsetY}px)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
          <div className="absolute right-6 bottom-6 left-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="text-foreground rounded-full bg-white/90 px-3 py-1 text-xs font-semibold">
                {pitch.type}
              </Badge>
            </div>
            <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              {pitch.title}
            </h1>
          </div>
        </div>

        <div className="space-y-6 px-6 py-6 sm:px-8 sm:py-8">
          <div className="text-muted-foreground grid gap-4 text-sm sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="text-muted-foreground inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{pitch.location}</span>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4" />
                {pitch.hours}
              </span>
              <span className="text-foreground inline-flex items-center gap-2 font-semibold">
                <IndianRupee className="h-4 w-4" />
                {pitch.price}/hr
              </span>
            </div>
          </div>

          <p className="text-muted-foreground max-w-3xl text-sm leading-7">
            {pitch.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {pitch.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="rounded-full px-3 py-1 text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PitchDetailHeroSection;
