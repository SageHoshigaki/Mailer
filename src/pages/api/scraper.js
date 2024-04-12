// pages/api/download.js
const puppeteer = require("puppeteer");
const path = require("path");
import { Storage } from "@google-cloud/storage";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const storage = new Storage(); // Assumes you have set up authentication
const bucketName = "gohighleveldc";

async function puppetArms(url) {
  const downloadPath = path.resolve(__dirname, "downloads"); // Set download directory

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      `--no-sandbox`,
      `--disable-setuid-sandbox`,
      `--disable-dev-shm-usage`,
      `--disable-accelerated-2d-canvas`,
      `--disable-gpu`,
    ],
  });
  const page = await browser.newPage();

  await page._client.send("Page.setDownloadBehavior", {
    behavior: "allow",
    downloadPath: downloadPath,
  });

  await page.goto(url);
  const finishBtn = await page.waitForSelector("#success-scroll-btn");
  await finishBtn.click();

  const downLoadbtn = await page.waitForSelector(".n-button-down");
  await downLoadbtn.click();

  // Wait for the download to finish
  await page.waitForTimeout(300000); // Adjust timeout as necessary

  await browser.close();

  // Construct the full path to the downloaded file
  const filePath = path.join(downloadPath, "yourDownloadedFile.pdf"); // Adjust file name as necessary

  console.log(filePath);

  return filePath;
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

    console.log(MailData.document);
    puppetArms(MailData.document);

    // Set a timeout for this function, adjust the time as needed
    res.setTimeout(30000, () => {
      console.error("Function timed out");
      res.status(504).json({ success: false, error: "Function timed out" });
    });

    console.log("Data saved:", savedData);
    res.status(200).json({ success: true, data: "Processed successfully" });
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
