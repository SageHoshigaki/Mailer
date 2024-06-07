import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import renameDownloadedFile from "@utils/common/dwnloadRename";
import resizePDF from "@utils/resizePdf";
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
  try {
    ensureDownloadDirectoryExists(downloadPath);

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

    const pdfFilePath = path.join(downloadPath, `${entryId}.pdf`);
    fs.writeFileSync(pdfFilePath, response.data);
    console.log("Downloaded PDF file saved:", pdfFilePath);

    if (!isValidPDF(pdfFilePath)) {
      throw new Error("Downloaded file is not a valid PDF");
    }

    const newFilePath = await renameDownloadedFile(pdfFilePath, entryId);
    const resizedFilePath = await resizePDF(newFilePath);
    const newFileUrl = await uploadToGoogleCloud(resizedFilePath);

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
  return data.slice(0, 4).toString() === "%PDF";
}

export default puppetArms;
