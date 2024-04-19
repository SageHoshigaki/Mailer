// pages/api/queues.js

import { allQueues } from "@queue/totalQueue"; // Adjust path as necessary

export default async function handler(req, res) {
  try {
    const queueDetails = await Promise.all(
      Object.entries(allQueues).map(async ([name, queue]) => {
        const jobCounts = await queue.getJobCounts();
        return { name, jobCounts };
      })
    );

    // Include a custom message in the JSON response
    res.status(200).json({
      message: "Endpoint was successfully hit",
      data: queueDetails,
    });
  } catch (error) {
    // Handle any errors that might occur during the fetching of job counts
    console.error("Error fetching queue details:", error);
    res.status(500).json({
      message: "Failed to fetch queue details",
      error: error.message,
    });
  }
}
