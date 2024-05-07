import Cors from "cors";
import initMiddleware from "@utils/initMiddleware";
import saveMailData from "@utils/saveMailData";
import { puppetQueue } from "@queue/puppetQueue";
import { ensureRedisConnection } from "@utils/redisManager";

// Initialize the CORS middleware
const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST"], // Only allow POST requests
    origin: true, // Reflect the request origin or specify if needed
    credentials: true,
  })
);

export default async function handler(req, res) {
  // Run CORS middleware first
  await cors(req, res);

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // Ensure Redis is connected before proceeding
    await ensureRedisConnection();
    console.log("Redis connection established.");

    // Log request body for debugging; ensure sensitive information is handled securely
    console.log("Request body", req.body);

    // Process incoming mail data and save it
    const savedData = await saveMailData(req.body.data);
    console.log("Mail data saved.", savedData);

    console.log(savedData.document, savedData.id); // Attempt to add a job to the queue with the saved data
    await puppetQueue.add({
      documentUrl: savedData.document,
      documentId: savedData.id.toString(),
    });

    // Send a successful response back to client
    res.status(200).json({
      success: true,
      message: "Mail data saved and queued successfully",
    });
  } catch (error) {
    console.error("API handler encountered an error:", error);

    // Handle specific errors differently based on the error message
    if (error.message.includes("Redis")) {
      res
        .status(500)
        .json({ success: false, error: "Failed to connect to Redis." });
    } else if (error.message.includes("queue")) {
      res
        .status(500)
        .json({ success: false, error: "Failed to queue the document." });
    } else {
      // General error handling
      res.status(500).json({ success: false, error: error.message });
    }
  }
}
