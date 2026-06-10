import { createClient } from "redis";
import { logger } from "../utils";

export const pubClient = createClient({
  url: process.env.REDIS_URL,
});

export const subClient = pubClient.duplicate();

export const connectRedis = async () => {
  await pubClient.connect();
  await subClient.connect();

  logger.info("Redis connected");
};
