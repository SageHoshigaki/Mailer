// queues/index.js
import { puppetQueue } from "./puppetQueue";
import { googleCloudQueue } from "./googleCloudQueue";
// Import other queues as you develop them

const allQueues = {
  puppetQueue,
  googleCloudQueue,

  // otherQueue,
};

export default allQueues;
