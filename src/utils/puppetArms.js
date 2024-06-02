import axios from "axios";
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

async function puppetArms(url, entryId) {
  try {
    ensureDownloadDirectoryExists(downloadPath);

    // Call the API endpoint on the DigitalOcean droplet to initiate the Puppeteer download
    const response = await axios.post(
      `${process.env.PUPPET_REMOTE}`,
      {
        url,
        entryId,
      },
      {
        responseType: "arraybuffer",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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
