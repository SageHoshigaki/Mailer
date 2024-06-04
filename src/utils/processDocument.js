import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const processDocument = async (documentUrl, documentId) => {
  try {
    const response = await axios.post(
      `${process.env.VERCEL_URL}/api/puppetremote`,
      {
        url: documentUrl,
        entryId: documentId,
      },
      {
        responseType: "json",
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 600000, // 10 minutes
      }
    );

    console.log("Received response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error running processDocument middleware:", error);
    throw new Error(error.message);
  }
};

export default processDocument;
