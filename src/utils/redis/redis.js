import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

// Singleton Redis Client
let client;

export async function ensureRedisConnection() {
  if (!client) {
    client = createClient({
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT, 10),
      },
    });

    client.on("connect", () => console.log("✅ Redis client connected"));
    client.on("error", (err) => console.error("❌ Redis client error:", err));

    await client.connect();
    console.log("🔄 Redis connection established");
  }

  return client;
}

// Export Redis Config (if needed elsewhere)
export const redisConfig = {
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT, 10),
  password: process.env.REDIS_PASSWORD,
};
