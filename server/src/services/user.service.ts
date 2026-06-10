import bcrypt from "bcrypt";
import { AppError } from "../utils";
import { UserRepository } from "../repositories";
import { generateToken } from "../utils/jwt";

export class UserService {
  private userRepository = new UserRepository();

  async register(data: {
    name: string;
    email: string;
    phoneNumber?: string;
    password: string;
  }) {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new AppError("User already exists", 400);
    }
    const existingPhone = await this.userRepository.findByPhoneNumber(
      data.phoneNumber!,
    );

    if (existingPhone) {
      throw new AppError("Phone number already registered", 400);
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async login(data: { email: string; password: string }) {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const isPasswordMatched = await bcrypt.compare(
      data.password,
      user.password,
    );

    if (!isPasswordMatched) {
      throw new AppError("Invalid email or password", 401);
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    const { password, ...userData } = user;

    return {
      token,
      user: userData,
    };
  }

  async getUserById(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
