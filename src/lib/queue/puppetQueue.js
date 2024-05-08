// src/queue/puppetQueue.js
import Bull from "bull";
import { redisConfig, client } from "@utils/redis";
import processDocument from "@utils/processDocument";
import { lobMailQueue } from "@queue/lobMailQueue";

// Create the Bull queue with the Redis configuration
const puppetQueue = new Bull("puppetQueue", {
  redis: redisConfig,
  settings: {
    maxStalledCount: 2,
    stalledInterval: 10000,
  },
});

// Consumer to process jobs
puppetQueue.process(async (job) => {
  try {
    const { documentUrl, documentId } = job.data;
    console.log(`Starting job ${job.id}:`, documentUrl, documentId);
    job.progress(45);
    await processDocument(documentUrl, documentId);
    console.log(`Job ${job.id} completed successfully.`);
  } catch (error) {
    console.error(`Error processing job ${job.id}:`, error);
    throw error; // Re-throw the error to mark the job as failed
  }
});

// Event listeners for debugging
puppetQueue.on("completed", async (job, result) => {
  try {
    console.log(
      `Job ${job.id} completed. Preparing to add a new job to lobMailQueue.`
    );
    const { documentId } = job.data; // Ensure this is how it's stored in job.data

    await lobMailQueue.add(
      { documentId }, // Pass this as an object
      {
        attempts: 5, // Optionally, set retry attempts
        backoff: {
          type: "exponential", // Backoff strategy
          delay: 1000, // Starting delay
        },
      }
    );
    console.log(
      `Job successfully added to lobMailQueue with Document ID: ${documentId}`
    );
  } catch (error) {
    console.error(`Failed to add job to lobMailQueue:`, error);
    console.error(`Error details: ${error.stack}`);
  }
});

puppetQueue.on("stalled", (job) => {
  console.log(`Job ${job.id} has stalled.`);
});

puppetQueue.on("failed", (job, error) => {
  console.error(`Job ${job.id} failed with error:`, error);
});

puppetQueue.on("active", (job) => {
  console.log(`Job ${job.id} is now active.`);
});

export { puppetQueue };
