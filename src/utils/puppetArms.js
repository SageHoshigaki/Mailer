import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import renameDownloadedFile from "@utils/common/dwnloadRename";
import resizePDF from "@utils/resizePdf";
import uploadToGoogleCloud from "@utils/cloud/googlecloud";
import updatePdfLink from "@utils/db/update";

dotenv.config();
// Use the /tmp directory for downloads
const downloadPath = path.resolve("/tmp", "downloads");

async function puppetArms(url, entryId) {
  try {
    ensureDownloadDirectoryExists(downloadPath);

    // Call the endpoint on the droplet to initiate the Puppeteer download
    const response = await axios.get(process.env.PUPPET_REMOTE, {
      params: { url, entryId },
      responseType: "arraybuffer",
    });

    // Save the downloaded PDF file to the /tmp directory
    const pdfFilePath = path.join(downloadPath, `${entryId}.pdf`);
    fs.writeFileSync(pdfFilePath, response.data);
    console.log("Downloaded PDF file saved:", pdfFilePath);

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

function ensureDownloadDirectoryExists(downloadPath) {
  if (!fs.existsSync(downloadPath)) {
    fs.mkdirSync(downloadPath, { recursive: true });
    console.log("Download directory created.");
  }
}

export default puppetArms;
