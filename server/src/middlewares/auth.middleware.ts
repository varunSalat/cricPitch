import { Request, Response, NextFunction } from "express";
import { prisma } from "../config";
import { AppError } from "../utils";
import { verifyToken } from "../utils/jwt";

export interface AuthenticatedRequest extends Request {
  user?: { userId: string; email: string };
}
export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  if (!token) {
    throw new AppError("Authorization token missing", 401);
  }

  try {
    const decoded = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });

    if (!user) {
      throw new AppError("Unauthorized", 401);
    }

    req.user = {
      userId: user.id,
      email: user.email,
    };

    next();
  } catch (error) {
    next(new AppError("Invalid or expired token", 401));
  }
};
