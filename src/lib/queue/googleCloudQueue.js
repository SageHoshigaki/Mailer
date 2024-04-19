import Bull from "bull";
import { redisClient } from "./redis";

const googleCloudQueue = new Bull("googleCloudQueue", {
  redis: redisClient,
});
