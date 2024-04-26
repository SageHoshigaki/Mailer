import puppetArms from "@utils/puppetArms";

// Gives Data Document For PuppetArms the Db Id And The Url To Download Document
const processDocument = async (documentUrl, documentId) => {
  try {
    // Pass both the URL and the ID to your puppetArms function
    await puppetArms(documentUrl, documentId);
  } catch (error) {
    console.error("Error running processDocument middleware:", error);
    throw new Error(error.message);
  }
};

export default processDocument;
