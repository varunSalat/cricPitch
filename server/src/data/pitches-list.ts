export interface Pitch {
  id: string;
  title: string;
  type: string;
  typeStyle: string;
  image: string;
  price: string;
  location: string;
  hours: string;
  tags: string[];
  more: number;
  description: string;
}

export const pitches: Pitch[] = [
  {
    id: "6a280a823a1071f9493aeaac",
    title: "Champions Turf Ground",
    type: "Turf Ground",
    typeStyle: "bg-emerald-100 text-emerald-700 border-emerald-200",
    image:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1600&q=80",
    price: "1500",
    location: "Green Park Stadium, Block A",
    hours: "6:00 – 22:00",
    tags: [
      "Floodlights",
      "Changing Rooms",
      "Scoreboard",
      "Drinking Water",
      "Parking",
    ],
    more: 0,
    description:
      "Professional-grade natural turf pitch with full-length boundaries. Perfect for serious cricket practice and matches.",
  },
  {
    id: "6a280a823a1071f9493aeaad",
    title: "Striker Box Cricket",
    type: "Box Cricket",
    typeStyle: "bg-amber-100 text-amber-700 border-amber-200",
    image:
      "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=1600&q=80",
    price: "800",
    location: "Sports Complex, Sector 12",
    hours: "7:00 – 23:00",
    tags: ["LED Lights", "Seating Area", "Water Cooler"],
    more: 0,
    description:
      "High-energy indoor box cricket facility with premium turf, great lighting, and fast-paced nets for training and matches.",
  },
  {
    id: "6a280a823a1071f9493aeaae",
    title: "Elite Indoor Nets",
    type: "Indoor Nets",
    typeStyle: "bg-blue-100 text-blue-700 border-blue-200",
    image:
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1600&q=80",
    price: "600",
    location: "Indoor Sports Arena, MG Road",
    hours: "6:00 – 22:00",
    tags: ["Bowling Machine", "AC", "Changing Rooms"],
    more: 0,
    description:
      "Premium indoor cricket nets with climate control and advanced bowling machines for focused practice sessions.",
  },
  {
    id: "6a280a823a1071f9493aeaaf",
    title: "Premier Astro Turf",
    type: "Astro Turf",
    typeStyle: "bg-violet-100 text-violet-700 border-violet-200",
    image:
      "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=1600&q=80",
    price: "1200",
    location: "City Sports Hub, Ring Road",
    hours: "5:00 – 23:00",
    tags: ["Floodlights", "Pavilion", "Refreshments"],
    more: 0,
    description:
      "Modern astro turf ground with excellent drainage and spectator facilities, ideal for late night matches.",
  },
  {
    id: "6a280a823a1071f9493aeab0",
    title: "Cement Practice Pitch",
    type: "Cement Pitch",
    typeStyle: "bg-stone-100 text-stone-700 border-stone-200",
    image:
      "https://images.unsplash.com/photo-1594470117722-de4b9a02ebed?w=1600&q=80",
    price: "400",
    location: "Municipal Ground, Lake View",
    hours: "6:00 – 20:00",
    tags: ["Basic Lights", "Drinking Water", "Open Parking"],
    more: 0,
    description:
      "Simple and affordable practice pitch with reliable hard surface and basic amenities for everyday training.",
  },
];
