import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

// Global Redis Client Instance
let client;

async function ensureRedisConnection() {
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

export { ensureRedisConnection };
