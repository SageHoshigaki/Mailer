import dotenv from "dotenv";
const { Storage } = require("@google-cloud/storage");
const { loadGoogleCredentials } = require("@utils/cloud/googleCredentials");

dotenv.config();

async function uploadToGoogleCloud(filePath) {
  console.log("Starting upload to Google Cloud...");

  // Load the credentials
  const credentialsPath = await loadGoogleCredentials();
  console.log(`Google credentials loaded from: ${credentialsPath}`);

  // Initialize the Google Cloud Storage client
  const storage = new Storage();
  const bucketName = "gohigh-level-mail";

  const fileName = path.basename(filePath);
  console.log(`Uploading file ${fileName} to bucket ${bucketName}`);

  await storage.bucket(bucketName).upload(filePath, {
    destination: fileName,
  });

  const fileUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
  console.log(`File uploaded to: ${fileUrl}`);
  return fileUrl;
}

module.exports = uploadToGoogleCloud;
