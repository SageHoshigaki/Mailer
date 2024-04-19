import Bull from "bull";
import { client } from "@utils/redis";

const googleCloudQueue = new Bull("googleCloudQueue", {
  redis: redisClient,
});
