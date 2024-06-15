// src/utils/redis.js
import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const client = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10),
  },
});

async function ensureRedisConnection() {
  if (!client.isOpen) {
    await client.connect();
  }
}

export { client, ensureRedisConnection };
