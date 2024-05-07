import Bull from "bull";
import { redisConfig } from "@utils/redis";
import sendLobMail from "@utils/lobmail";

const lobMailQueue = new Bull("lobMailQueue", { redis: redisConfig });

lobMailQueue.process(async (job) => {
  console.log(`Processing job in lobMailQueue with ID: ${job.id}`);
  try {
    // Correctly extract documentId from job.data
    const { documentId } = job.data;
    if (!documentId) {
      throw new Error("documentId is missing from job data.");
    }

    console.log(`Sending Lob mail for Document ID: ${documentId}`);
    await sendLobMail(documentId);
    console.log("Job completed successfully.");
  } catch (error) {
    console.error(`Error processing lobMailQueue job ${job.id}:`, error);
    throw error; // Ensures the job can be retried if it fails
  }
});

// Event listeners for debugging
lobMailQueue.on("failed", (job, error) => {
  console.error(`lobMailQueue Job ${job.id} failed with error:`, error);
});

lobMailQueue.on("completed", (job) => {
  console.log(`lobMailQueue Job ${job.id} has completed.`);
});

lobMailQueue.on("active", (job) => {
  console.log(`lobMailQueue Job ${job.id} is now active.`);
});

lobMailQueue.on("stalled", (job) => {
  console.log(`lobMailQueue Job ${job.id} has stalled.`);
});

lobMailQueue.on("error", (error) => {
  console.error("Redis error in lobMailQueue:", error);
});
export { lobMailQueue };
