// pages/api/download.js
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
import { Storage } from "@google-cloud/storage";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const storage = new Storage(); // Assumes you have set up authentication
const bucketName = "gohighleveldc";

async function puppetArms(url) {
  let browser;
  try {
    const downloadPath = path.resolve(__dirname, "downloads");

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

    await page._client.send("Page.setDownloadBehavior", {
      behavior: "allow",
      downloadPath: downloadPath,
    });

    await page.goto(url, { waitUntil: "networkidle0" });
    const finishBtn = await page.waitForSelector("#success-scroll-btn");
    await finishBtn.click();
    const downLoadbtn = await page.waitForSelector(".n-button-down");
    await downLoadbtn.click();

    // Wait for the download to start and finish; replace 'waitForDownload' with a function that checks for file presence
    await waitForDownload(downloadPath);

    // Find the downloaded file
    const downloadedFile = fs
      .readdirSync(downloadPath)
      .find((file) => file.endsWith(".pdf")); // Adjust if necessary to match the file pattern
    if (!downloadedFile) {
      throw new Error("Download failed or file not found.");
    }

    const filePath = path.join(downloadPath, downloadedFile);
    console.log("Downloaded file path:", filePath);

    return filePath;
  } catch (error) {
    console.error("Error in puppetArms function:", error);
    throw error; // Rethrow error for handling in the calling function
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

async function waitForDownload(downloadPath, timeout = 300000) {
  // Default timeout is 5 minutes
  let elapsed = 0; // Time elapsed since the start of the download
  const interval = 1000; // Check every 1 second

  return new Promise((resolve, reject) => {
    // This interval will repeatedly check if the file exists
    const intervalId = setInterval(() => {
      // List all files in the download directory
      const files = fs.readdirSync(downloadPath);

      // Check if there is a file with the .pdf extension
      const downloadedFile = files.find((file) => file.endsWith(".pdf"));

      if (downloadedFile) {
        clearInterval(intervalId); // Stop polling
        resolve(path.join(downloadPath, downloadedFile)); // Resolve with the file path
      } else if (elapsed > timeout) {
        clearInterval(intervalId); // Stop polling
        reject(
          new Error("Download did not complete within the expected time.")
        );
      }

      elapsed += interval;
    }, interval);

    // Additionally, we listen for the process to exit and clear the interval to avoid a Node.js exit error.
    process.on("exit", () => {
      clearInterval(intervalId);
    });
  });
}

async function uploadToGoogleCloud(filePath) {
  const fileName = filePath.split("/").pop();
  await storage.bucket(bucketName).upload(filePath, {
    destination: fileName,
  });

  return `https://storage.googleapis.com/${bucketName}/${fileName}`;
}

async function updateDatabaseWithPdfLink(entryId, pdfLink) {
  await prisma.dataModel.update({
    where: { id: entryId },
    data: { pdfLink },
  });
}

const scraperGet = (req, res) => {
  console.log("Hello You hit the server route");
  res.status(200).json({ message: "Hello You hit the server route" });
};

const scraperPost = async (req, res) => {
  console.log(req.body);

  try {
    // Extract MailData from the request body
    const { MailData } = req.body;

    if (!MailData) {
      return res.status(400).json({
        success: false,
        error: "MailData is missing from the request body",
      });
    }

    // Use the MailData object in the create method
    const savedData = await prisma.userMailService.create({
      data: {
        ...MailData,
      },
    });

    // Set a timeout for this function, adjust the time as needed
    res.setTimeout(30000, () => {
      console.error("Function timed out");
      res.status(504).json({ success: false, error: "Function timed out" });
    });

    console.log("Data saved:", savedData);
    res.status(200).json({ success: true, data: "Processed successfully" });

    setImmediate(async () => {
      try {
        await puppetArms();
      } catch (error) {
        console.error("Error running additional function:", error);
        // Handle error - perhaps retry the task, log the error, etc.
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return scraperGet(req, res);
    case "POST":
      return scraperPost(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
