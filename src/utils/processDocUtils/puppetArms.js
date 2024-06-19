import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import renameDownloadedFile from "@utils/common/dwnloadRename";
import resizePDF from "@utils/processDocUtils/resizePdf";
import uploadToGoogleCloud from "@utils/cloud/googlecloud";
import updatePdfLink from "@utils/db/update";

dotenv.config();

const localDownloadPath = path.resolve(__dirname, "..", "downloads");
const productionDownloadPath = "/tmp/downloads";

const downloadPath =
  process.env.NODE_ENV === "production"
    ? productionDownloadPath
    : localDownloadPath;

async function puppetArms(url, entryId) {
  console.log("Starting puppetArms function");
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Download path: ${downloadPath}`);
  console.log(`URL: ${url}`);
  console.log(`Entry ID: ${entryId}`);

  try {
    ensureDownloadDirectoryExists(downloadPath);
    console.log("Ensured download directory exists");

    const response = await axios.post(
      `${process.env.PUPPET_REMOTE}`, // Ensure this is the correct URL for your Vercel deployment
      {
        url,
        entryId,
      },
      {
        responseType: "arraybuffer",
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 300000, // 5 minutes
      }
    );
    console.log("Received response from PUPPET_REMOTE");

    const pdfFilePath = path.join(downloadPath, `${entryId}.pdf`);
    fs.writeFileSync(pdfFilePath, response.data);
    console.log("Downloaded PDF file saved:", pdfFilePath);

    if (!isValidPDF(pdfFilePath)) {
      throw new Error("Downloaded file is not a valid PDF");
    }
    console.log("Validated downloaded PDF file");

    const newFilePath = await renameDownloadedFile(pdfFilePath, entryId);
    console.log("Renamed downloaded file:", newFilePath);

    const resizedFilePath = await resizePDF(newFilePath);
    console.log("Resized PDF file:", resizedFilePath);

    const newFileUrl = await uploadToGoogleCloud(resizedFilePath);
    console.log("Uploaded file to Google Cloud:", newFileUrl);

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
  } else {
    console.log("Download directory already exists.");
  }
}

function isValidPDF(filePath) {
  const data = fs.readFileSync(filePath);
  return data.slice(0, 4).toString() === "%PDF";
}

export default puppetArms;
