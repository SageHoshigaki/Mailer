import { Storage } from "@google-cloud/storage";
const storage = new Storage(); // Assumes you have set up authentication
const bucketName = "gohigh-level-mail";

async function uploadToGoogleCloud(filePath) {
  const fileName = filePath.split("/").pop();
  await storage.bucket(bucketName).upload(filePath, {
    destination: fileName,
  });

  return `https://storage.googleapis.com/${bucketName}/${fileName}`;
}

module.exports = uploadToGoogleCloud;
