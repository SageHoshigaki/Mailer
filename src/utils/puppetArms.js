import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";
import renameDownloadedFile from "@utils/common/dwnloadRename";
import uploadToGoogleCloud from "@utils/cloud/googlecloud";
import updatePdfLink from "@utils/db/update";
import resizePDF from "@utils/resizePdf";
import waitForDownload from "@utils/waitForDownload";
//check
// Use the /tmp directory for downloads, permissible in Vercel's environment
const downloadPath = path.resolve("/tmp", "downloads");

async function puppetArms(pdf, entryId) {
  let browser;
  try {
    ensureDownloadDirectoryExists(downloadPath);
    const filePath = await findDownloadedFile(downloadPath);
    const newFilePath = await renameDownloadedFile(filePath, entryId);
    const resizedFilePath = await resizePDF(newFilePath);
    const newFileUrl = await uploadToGoogleCloud(resizedFilePath);

    await updatePdfLink(entryId, newFileUrl);
    console.log("Document updated in the database:", newFileUrl);
    return newFileUrl;
  } catch (error) {
    console.error("Error in puppetArms function:", error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
      console.log("Puppeteer browser closed.");
    }
  }
}

function ensureDownloadDirectoryExists(downloadPath) {
  if (!fs.existsSync(downloadPath)) {
    fs.mkdirSync(downloadPath, { recursive: true });
    console.log("Download directory created.");
  }
}

async function findDownloadedFile(downloadPath) {
  const downloadedFiles = fs.readdirSync(downloadPath);
  const downloadedFile = downloadedFiles.find((file) => file.endsWith(".pdf"));
  if (!downloadedFile) {
    throw new Error("No downloaded PDF file found.");
  }
  return path.join(downloadPath, downloadedFile);
}

export default puppetArms;
// circle
