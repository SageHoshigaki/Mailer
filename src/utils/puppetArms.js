const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
import renameDownloadedFile from "@utils/common/dwnloadRename";
import uploadToGoogleCloud from "@utils/cloud/googlecloud";
import updatePdfLink from "@utils/db/update";
import resizePDF from "@utils/resizePdf";

const downloadPath = path.join(__dirname, "..", "src", "downloads");

require("dotenv").config();

import waitForDownload from "@utils/waitForDownload";

async function puppetArms(url, entryId) {
  // Default path if env var is missing

  if (!fs.existsSync(downloadPath)) {
    fs.mkdirSync(downloadPath, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--disable-gpu",
    ],
  });

  const page = await browser.newPage();

  // Create a new CDP session and set download behavior
  const client = await page.target().createCDPSession();
  await client.send("Page.setDownloadBehavior", {
    behavior: "allow",
    downloadPath: downloadPath,
  });

  try {
    await page.goto(url, { waitUntil: "networkidle0" });

    // Selector for the dropdown trigger
    const dropdownTriggerSelector =
      'span.n-button__content > svg[aria-hidden="true"]';
    // Selector for the dropdown option to download PDF
    const downbtnSelector = ".v-binder-follower-content";

    // Wait for the dropdown trigger to appear and click it
    await page.waitForSelector(dropdownTriggerSelector, { visible: true });
    await page.click(dropdownTriggerSelector);

    // Wait for the element to be available
    await page.waitForSelector(downbtnSelector, { visible: true });

    // Click on the element
    await page.click(downbtnSelector, { visibility: "true" });

    // Clicking twice as per your setup

    await waitForDownload(downloadPath);

    // Find the downloaded file
    const downloadedFile = fs
      .readdirSync(downloadPath)
      .find((file) => file.endsWith(".pdf"));
    if (!downloadedFile) {
      throw new Error("Download failed or file not found.");
    }

    const filePath = path.join(downloadPath, downloadedFile);
    const newFilePath = await renameDownloadedFile(filePath, entryId);
    const resizedFilePath = await resizePDF(newFilePath);
    const newFileUrl = await uploadToGoogleCloud(resizedFilePath);
    const updatedDocument = await updatePdfLink(entryId, newFileUrl);

    console.log("Document updated in the database:", updatedDocument);
    return newFileUrl;
  } catch (error) {
    console.error("Error in puppetArms function:", error);
    throw error;
  } finally {
    await browser.close();
  }
}

export default puppetArms;
