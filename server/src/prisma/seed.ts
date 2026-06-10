import { PrismaClient } from "@prisma/client";
import { pitches as pitchData } from "../data/pitches-list";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding pitches...");

  // Upsert each pitch from the pitches-list data
  for (const pitch of pitchData) {
    await prisma.pitch.upsert({
      where: { id: pitch.id },
      update: {
        name: pitch.title,
        type: pitch.type,
        typeStyle: pitch.typeStyle,
        image: pitch.image,
        location: pitch.location,
        sportType: pitch.type,
        pricePerHour: parseFloat(pitch.price),
        hours: pitch.hours,
        tags: pitch.tags,
        description: pitch.description,
      },
      create: {
        id: pitch.id,
        name: pitch.title,
        type: pitch.type,
        typeStyle: pitch.typeStyle,
        image: pitch.image,
        location: pitch.location,
        sportType: pitch.type,
        pricePerHour: parseFloat(pitch.price),
        hours: pitch.hours,
        tags: pitch.tags,
        description: pitch.description,
      },
    });
  }

  console.log(`Seeded ${pitchData.length} pitches`);

  // Now fetch all seeded pitches and generate time slots
  const pitches = await prisma.pitch.findMany();

  if (!pitches.length) {
    throw new Error("No pitches found after seeding");
  }

  const startDate = new Date();
  const endDate = new Date("2026-06-18");

  const slots = [];

  for (
    let current = new Date(startDate);
    current <= endDate;
    current.setDate(current.getDate() + 1)
  ) {
    // Keep only date part (00:00:00)
    const slotDate = new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate(),
      0,
      0,
      0,
      0,
    );

    for (const pitch of pitches) {
      for (let hour = 6; hour < 23; hour++) {
        slots.push({
          pitchId: pitch.id,
          date: slotDate,
          startTime: `${String(hour).padStart(2, "0")}:00`,
          endTime: `${String(hour + 1).padStart(2, "0")}:00`,
          isBooked: false,
        });
      }
    }
  }

  // Clear old slots before reseeding
  await prisma.timeSlot.deleteMany();

  await prisma.timeSlot.createMany({
    data: slots,
  });

  console.log(`Created ${slots.length} slots`);
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
