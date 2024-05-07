import saveMailData from "@utils/saveMailData";
import { puppetQueue } from "@queue/puppetQueue";
import { ensureRedisConnection } from "@utils/redisManager";

// Enhanced API route handler in Next.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // Ensure Redis is connected before proceeding
    await ensureRedisConnection();
    console.log("Redis connection established.");

    console.log("Request body", req.body);

    // Process incoming mail data
    await saveMailData(req.body.data);
    console.log("saved mail data", req.body);
    console.log("Mail data saved.");

    // Access the modified request data
    const { document, id } = req.savedData;

    // Directly in your application startup code or a separate test script

    // Try to add a job to the queue
    await puppetQueue.add({
      documentUrl: document,
      documentId: id.toString(),
    });

    // Send a successful response
    res.status(200).json({
      success: true,
      message: "MailData saved and queued successfully",
    });
  } catch (error) {
    // Log and return error
    console.error("API handler encountered an error:", error);

    // Handle specific errors differently if needed
    if (error.message.includes("Redis")) {
      // Specific Redis error handling
      res
        .status(500)
        .json({ success: false, error: "Failed to connect to Redis." });
    } else if (error.message.includes("queue")) {
      // Specific queue error handling
      res
        .status(500)
        .json({ success: false, error: "Failed to queue the document." });
    } else {
      // General error handling
      res.status(500).json({ success: false, error: error.message });
    }
  }
}
