import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";

import { connectRedis, pubClient, subClient } from "../config/redis";
import { socketAuth } from "../middlewares/socket.auth.middleware";
import { slotSocket } from "./slot.socket";

export let io: Server;

export const initSocket = async (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  // Only use the Redis adapter when Redis is available.
  // Otherwise fall back to the default in-memory adapter.
  const redisConnected = await connectRedis();
  if (redisConnected) {
    io.adapter(createAdapter(pubClient, subClient));
  }

  io.use(socketAuth);

  io.on("connection", (socket) => {
    console.log("Socket Connected:", socket.id);

    slotSocket(io, socket);
  });

  return io;
};
