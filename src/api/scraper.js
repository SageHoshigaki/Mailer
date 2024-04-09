// pages/api/download.js
import puppeteer from "puppeteer";
import { Storage } from "@google-cloud/storage";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const storage = new Storage(); // Assumes you have set up authentication
const bucketName = "gohighleveldc";

const scraperGet = (req, res) => {
  console.log(req.body);
};

const scraperPost = async (req, res) => {

   const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const url =
      "https://link.pennequitygroup.com/documents/v1/25d92655-3f21-464e-a026-bd54234ab15d";

    try {
      await page.goto(url);

      // Interact with the page as necessary
      const finishBtn = await page.waitForSelector("#success-scroll-btn");
      await finishBtn.click();
      const downLoadBtn = await page.waitForSelector(".n-button-down");
      await downLoadBtn.click();

      // Handle the PDF download here...
      // For demonstration, let's assume `pdfBuffer` is the PDF file content
      const pdfBuffer = await page.screenshot(); // Replace with actual PDF download logic

      // Upload the PDF to Google Cloud Storage
      const bucket = storage.bucket(bucketName);
      const fileName = `pdfs/${Date.now()}.pdf`;
      const file = bucket.file(fileName);
      await file.save(pdfBuffer);

      // Save the reference in CockroachDB
      const savedData = await prisma.UserMailService.create({
        data: {
          from,
          to,
          pdfUrl: `https://storage.googleapis.com/${bucketName}/${fileName}`,
        },
      });

      await browser.close();
      res.status(200).json({ success: true, data: savedData });
    } catch (error) {
      console.error(error);
      await browser.close();
      res.status(500).json({ success: false, error: error.message });
    } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
   }
}






export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return scraperGet(req, res);
    case 'POST':
      return scraperPost(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      return res.status(405).end('Method ${req.method} Not Allowed');
  }

}
