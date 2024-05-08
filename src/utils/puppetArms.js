import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";
import renameDownloadedFile from "@utils/common/dwnloadRename";
import uploadToGoogleCloud from "@utils/cloud/googlecloud";
import updatePdfLink from "@utils/db/update";
import resizePDF from "@utils/resizePdf";
import waitForDownload from "@utils/waitForDownload";

const downloadPath = path.resolve(__dirname, "..", "downloads");

async function puppetArms(url, entryId) {
  let browser; // Define browser variable outside try block

  try {
    // Check if download directory exists, create if not
    if (!fs.existsSync(downloadPath)) {
      fs.mkdirSync(downloadPath, { recursive: true });
    }
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

    // Create a new CDP session and set download behavior
    const client = await page.target().createCDPSession();
    await client.send("Page.setDownloadBehavior", {
      behavior: "allow",
      downloadPath: downloadPath,
    });

    console.log("Opening the page...");
    await page.goto(url, { waitUntil: "networkidle0" });
    console.log("Page opened.");

    console.log("Clicking the dropdown...");
    // Selector for the dropdown trigger
    const dropdownTriggerSelector =
      'span.n-button__content > svg[aria-hidden="true"]';
    // Selector for the dropdown option to download PDF
    const downbtnSelector = ".v-binder-follower-content";
    console.log("Dropdown clicked.");

    // Wait for the dropdown trigger to appear and click it
    await page.waitForSelector(dropdownTriggerSelector, { visible: true });
    await page.click(dropdownTriggerSelector);

    // Wait for the element to be available
    await page.waitForSelector(downbtnSelector, { visible: true });

    // Click on the element
    await page.click(downbtnSelector, { visibility: "true" });

    console.log("Waiting for the download to finish...");
    // Clicking twice as per your setup
    await waitForDownload(downloadPath);
    console.log("Download finished.");

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
    // Handle the error or rethrow it if necessary
    throw error;
  } finally {
    // Close the browser in the finally block to ensure it's always closed
    if (browser) {
      await browser.close();
      console.log("Puppeteer browser closed.");
    }
  }
}

export default puppetArms;
