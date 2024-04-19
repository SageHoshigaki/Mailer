import { puppetArms } from "./puppetArms";

// Gives Data Document For PuppetArms the Db Id And The Url To Download Document
const processDocument = async (documentUrl, documentId) => {
  try {
    // Pass both the URL and the ID to your puppetArms function
    await puppetArms(documentUrl, documentId);
  } catch (error) {
    console.error("Error running processDocument middleware:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = processDocument;
