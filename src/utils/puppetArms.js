import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";
import renameDownloadedFile from "@utils/common/dwnloadRename";
import uploadToGoogleCloud from "@utils/cloud/googlecloud";
import updatePdfLink from "@utils/db/update";
import resizePDF from "@utils/resizePdf";
import waitForDownload from "@utils/waitForDownload";

// Use the /tmp directory for downloads, permissible in Vercel's environment
const downloadPath = path.resolve("/tmp", "downloads");

async function puppetArms(url, entryId) {
  let browser;
  try {
    // Ensure the download directory exists or create it
    ensureDownloadDirectoryExists(downloadPath);
    console.log("Initializing Puppeteer browser...");
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--disable-gpu",
      ],
    });
    console.log("Puppeteer browser initialized successfully.");

    const page = await browser.newPage();

    // Set download behavior to download directly into allowed tmp directory
    await page._client.send("Page.setDownloadBehavior", {
      behavior: "allow",
      downloadPath: downloadPath,
    });

    console.log("Navigating to URL...");
    await page.goto(url, { waitUntil: "networkidle0" });
    console.log("URL loaded.");

    // Trigger download
    console.log("Triggering download...");
    await triggerDownload(page);

    console.log("Waiting for download to finish...");
    await waitForDownload(downloadPath);
    console.log("Download finished.");

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

async function triggerDownload(page) {
  // Define selectors based on your actual page elements
  const downloadButtonSelector = "#downloadButton"; // Change as per actual selector on the page
  await page.waitForSelector(downloadButtonSelector, { visible: true });
  await page.click(downloadButtonSelector);
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
