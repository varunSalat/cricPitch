import jwt from "jsonwebtoken";

export const socketAuth = (socket: any, next: any) => {
  try {
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers?.authorization?.replace("Bearer ", "");

    if (!token) {
      return next(new Error("Unauthorized"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    socket.user = decoded;

    next();
  } catch (error) {
    next(new Error("Unauthorized"));
  }
};
