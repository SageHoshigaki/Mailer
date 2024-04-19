import { saveMailData } from "./saveMailData";
import { handleError } from "./handleError";
import { puppetQueue } from "../../lib/queue/puppetQueue";

// GET handler remains unchanged
const scraperGet = (req, res) => {
  res.status(200).json({ message: "Hello, you hit the server route" });
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    return scraperGet(req, res);
  }

  if (req.method === "POST") {
    try {
      // Run the `saveMailData` middleware
      await saveMailData(req, res);
      const mailDataNeeded = await saveMailData(req);
      //Start The Bull Redis Queue
      puppetQueue.add({
        documentUrl: mailDataNeeded.document,
        documentId: mailDataNeeded.id,
      });
    } catch (error) {
      // If there's an error, `handleError` will take care of it
      return handleError(error, req, res);
    }
  }

  // For all other HTTP methods
  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
