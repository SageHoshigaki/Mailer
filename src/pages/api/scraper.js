// pages/api/download.js
import puppeteer from "puppeteer";
import { Storage } from "@google-cloud/storage";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const storage = new Storage(); // Assumes you have set up authentication
const bucketName = "gohighleveldc";

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
    // Extract the data directly, assuming it's in the format you showed initially
    const receivedData = req.body;

    // Validate the receivedData structure
    if (!receivedData || typeof receivedData !== "object") {
      return res.status(400).json({
        success: false,
        error: "Received data is missing or not in the expected format",
      });
    }

    // Construct the customData object in the required format
    const customData = {
      document: receivedData.document,
      To_DebtCollectorName: receivedData.To_DebtCollectorName,
      To_DebtCollectorAddress: receivedData.To_DebtCollectorAddress,
      To_DebtCollectorCity: receivedData.To_DebtCollectorCity,
      To_DebtCollectorState: receivedData.To_DebtCollectorState,
      To_DebtCollectorZipCode: receivedData.To_DebtCollectorZipCode,
      From_ContactFullName: receivedData.From_ContactFullName,
      From_ContactAddress: receivedData.From_ContactAddress,
      From_ContactCity: receivedData.From_ContactCity,
      From_ContactState: receivedData.From_ContactState,
      From_ContactZipCode: receivedData.From_ContactZipCode,
    };

    console.log(customData);

    // Save the customData to the database
    const savedData = await prisma.userMailService.create({
      data: customData,
    });

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
