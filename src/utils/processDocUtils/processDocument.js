import dotenv from "dotenv";
import puppetArms from "@utils/puppetArms"; // Ensure you have the correct path to the puppetArms function

dotenv.config();

const processDocument = async (documentUrl, documentId) => {
  try {
    console.log("Triggering puppetArms function for document ID:", documentId);
    await puppetArms(documentUrl, documentId);
    console.log("puppetArms function completed for document ID:", documentId);
  } catch (error) {
    console.error("Error running processDocument middleware:", error);
    throw new Error(error.message);
  }
};

export default processDocument;
