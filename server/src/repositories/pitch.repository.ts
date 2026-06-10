import { prisma } from "../config";

export class PitchRepository {
  async findAll(
    page: number = 1,
    limit: number = 10,
    name?: string,
    type?: string,
    sortBy: string = "createdAt",
    sortOrder: "asc" | "desc" = "desc",
  ) {
    const skip = (page - 1) * limit;

    const where: any = {};
    if (name) {
      where.name = { contains: name };
    }
    if (type) {
      where.type = type;
    }

    // Supported sort keys
    const allowedSortFields = ["name", "pricePerHour", "createdAt"];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : "createdAt";
    const orderBy = { [sortField]: sortOrder };

    const [pitches, total] = await Promise.all([
      prisma.pitch.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        select: {
          id: true,
          name: true,
          type: true,
          typeStyle: true,
          image: true,
          location: true,
          hours: true,
          tags: true,
          pricePerHour: true,
        },
      }),
      prisma.pitch.count({ where }),
    ]);

    return {
      data: pitches,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string) {
    return prisma.pitch.findUnique({
      where: { id },
    });
  }
}
