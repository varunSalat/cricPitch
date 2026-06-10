import { prisma } from "../config";

export class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }
  async findByPhoneNumber(phoneNumber: string) {
    return prisma.user.findUnique({
      where: { phoneNumber },
    });
  }
  async create(data: {
    name: string;
    email: string;
    phoneNumber?: string;
    password: string;
  }) {
    return prisma.user.create({
      data,
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }
}
