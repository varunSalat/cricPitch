import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";

import { pubClient, subClient } from "../config/redis";
import { socketAuth } from "../middlewares/socket.auth.middleware";
import { slotSocket } from "./slot.socket";

export let io: Server;

export const initSocket = async (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.adapter(createAdapter(pubClient, subClient));

  io.use(socketAuth);

  io.on("connection", (socket) => {
    console.log("Socket Connected:", socket.id);

    slotSocket(io, socket);
  });

  return io;
};
