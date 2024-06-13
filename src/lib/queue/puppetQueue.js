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
  defaultJobOptions: {
    timeout: 600000, // Increased timeout to 10 minutes
    attempts: 3, // Retry up to 3 times
    backoff: {
      type: "exponential",
      delay: 1000,
    },
  },
});

// Function to retry network requests with exponential backoff
const fetchWithRetry = async (url, options, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      const backoffTime = Math.pow(2, i) * 1000;
      await new Promise((resolve) => setTimeout(resolve, backoffTime));
    }
  }
};

// Consumer to process jobs
puppetQueue.process(async (job) => {
  try {
    const { documentUrl, documentId } = job.data;
    console.log(`Starting job ${job.id}:`, documentUrl, documentId);

    if (!documentUrl || !documentId) {
      throw new Error("Document URL or Document ID is missing");
    }

    // Use fetchWithRetry to handle network requests
    await fetchWithRetry(documentUrl, { method: "GET" });
    await processDocument(documentUrl, documentId);

    job.progress(85);
    console.log(`Job ${job.id} completed successfully.`);
  } catch (error) {
    console.error(`Error processing job ${job.id}: ${error.message}`);
    console.error(`Job Data:`, job.data);
    console.error(`Error Stack:`, error.stack);

    // Specific error handling
    if (error.message.includes("timeout")) {
      console.error(`Timeout occurred for job ${job.id}`);
    } else if (error.message.includes("path is not defined")) {
      console.error(`Path is not defined for job ${job.id}`);
    } else if (error.message.includes("socket hang up")) {
      console.error(`Socket hang up for job ${job.id}`);
    }

    throw error; // Re-throw the error to mark the job as failed
  }
});

// Event listeners for debugging
puppetQueue.on("completed", async (job, result) => {
  try {
    console.log(
      `Job ${job.id} completed. Preparing to add a new job to lobMailQueue.`
    );
    const { documentId } = job.data;

    await lobMailQueue.add(
      { documentId },
      {
        attempts: 2,
        backoff: {
          type: "exponential",
          delay: 1000,
        },
      }
    );
    console.log(
      `Job successfully added to lobMailQueue with Document ID: ${documentId}`
    );
  } catch (error) {
    console.error(`Failed to add job to lobMailQueue: ${error.message}`);
    console.error(`Job Data:`, job.data);
    console.error(`Error Stack:`, error.stack);
  }
});

puppetQueue.on("stalled", (job) => {
  console.log(`Job ${job.id} has stalled.`);
});

puppetQueue.on("failed", (job, error) => {
  console.error(`Job ${job.id} failed with error: ${error.message}`);
  console.error(`Job Data:`, job.data);
  console.error(`Error Stack:`, error.stack);
});

puppetQueue.on("active", (job) => {
  console.log(`Job ${job.id} is now active.`);
});

export { puppetQueue };
