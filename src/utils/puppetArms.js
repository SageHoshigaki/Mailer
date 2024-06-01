import axios from "axios";
import axiosRetry from "axios-retry";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import renameDownloadedFile from "@utils/common/dwnloadRename";
import resizePDF from "@utils/resizePdf";
import uploadToGoogleCloud from "@utils/cloud/googlecloud";
import updatePdfLink from "@utils/db/update";

dotenv.config();

// Use the downloads folder within the src directory for local downloads
const localDownloadPath = path.resolve(__dirname, "..", "downloads");
// Use the /tmp directory for Vercel (production)
const productionDownloadPath = "/tmp/downloads";

// Determine the correct download path based on the environment
const downloadPath =
  process.env.NODE_ENV === "production"
    ? productionDownloadPath
    : localDownloadPath;

// Create an axios instance with a longer timeout
const axiosInstance = axios.create({
  timeout: 60000, // 60 seconds
  responseType: "arraybuffer",
  headers: {
    "Content-Type": "application/json",
  },
});

// Apply axios-retry to the axios instance
axiosRetry(axiosInstance, {
  retries: 3, // Number of retries
  retryDelay: (retryCount) => {
    return retryCount * 2000; // Time interval between retries in milliseconds
  },
  retryCondition: (error) => {
    // Retry on network errors or 5xx status codes
    return error.response?.status >= 500 || error.code === "ECONNABORTED";
  },
});

async function puppetArms(url, entryId) {
  try {
    ensureDownloadDirectoryExists(downloadPath);

    // Call the endpoint on the droplet to initiate the Puppeteer download
    const response = await axiosInstance.post(process.env.PUPPET_REMOTE, {
      url,
      entryId,
    });

    // Save the downloaded PDF file to the downloads folder
    const pdfFilePath = path.join(downloadPath, `${entryId}.pdf`);
    fs.writeFileSync(pdfFilePath, response.data);
    console.log("Downloaded PDF file saved:", pdfFilePath);

    // Verify the downloaded file is a valid PDF
    if (!isValidPDF(pdfFilePath)) {
      throw new Error("Downloaded file is not a valid PDF");
    }

    // Rename, resize, and upload the PDF file
    const newFilePath = await renameDownloadedFile(pdfFilePath, entryId);
    const resizedFilePath = await resizePDF(newFilePath);
    const newFileUrl = await uploadToGoogleCloud(resizedFilePath);

    // Update the PDF link in the database
    await updatePdfLink(entryId, newFileUrl);
    console.log("Document updated in the database:", newFileUrl);

    return newFileUrl;
  } catch (error) {
    console.error("Error in puppetArms function:", error);
    throw error;
  }
}

function ensureDownloadDirectoryExists(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
    console.log("Download directory created.");
  }
}

function isValidPDF(filePath) {
  const data = fs.readFileSync(filePath);
  // Check for the PDF header
  return data.slice(0, 4).toString() === "%PDF";
}

export default puppetArms;
