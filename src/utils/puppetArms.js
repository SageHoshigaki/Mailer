const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
require("dotenv").config();

import { waitForDownload } from "./timer";

async function puppetArms(url, entryId) {
  let browser;
  try {
    // Assuming __dirname is the directory of the current module 'scraper.js', and downloads is up one level.
    const downloadsPath = process.env.DOWNLOADS_PATH;

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
    const page = await browser.newPage();

    // Create a CDP session and set download behavior
    const client = await page.target().createCDPSession();
    await client.send("Page.setDownloadBehavior", {
      behavior: "allow",
      downloadPath: downloadsPath, // Use the correct downloadsPath
    });

    await page.goto(url, { waitUntil: "networkidle0" });

    const finishBtn = await page.waitForSelector("#success-scroll-btn");
    await finishBtn.click();
    const downLoadbtn = await page.waitForSelector(
      "#document-state-actions-btn"
    );
    await downLoadbtn.click();

    const actualDonwloadBtn = await page.waitForSelector(
      "#document-state-actions-btn"
    );
    await actualDonwloadBtn.click();

    // The waitForDownload function should also use downloadsPath
    await waitForDownload(downloadsPath);

    // Find the downloaded file
    const downloadedFile = fs
      .readdirSync(downloadsPath) // Use the correct downloadsPath
      .find((file) => file.endsWith(".pdf"));
    if (!downloadedFile) {
      throw new Error("Download failed or file not found.");
    }

    const filePath = path.join(downloadsPath, downloadedFile); // Use the correct downloadsPath
    console.log("Downloaded file path:", filePath);

    return filePath;
  } catch (error) {
    console.error("Error in puppetArms function:", error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

export default puppetArms;
