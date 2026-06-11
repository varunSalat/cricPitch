import { createClient } from "redis";
import { logger } from "../utils";

export const pubClient = createClient({
  url: process.env.REDIS_URL,
});

export const subClient = pubClient.duplicate();

export const connectRedis = async (): Promise<boolean> => {
  if (!process.env.REDIS_URL) {
    logger.warn("REDIS_URL not set, skipping Redis connection");
    return false;
  }

  try {
    await pubClient.connect();
    await subClient.connect();
    logger.info("Redis connected");
    return true;
  } catch (error) {
    logger.warn(
      `Redis connection failed, falling back to in-memory adapter: ${
        (error as Error).message
      }`,
    );
    return false;
  }
};
