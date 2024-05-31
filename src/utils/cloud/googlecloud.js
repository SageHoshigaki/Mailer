const { Storage } = require("@google-cloud/storage");
const { loadGoogleCredentials } = require("@utils/googleCredentials");

async function uploadToGoogleCloud(filePath) {
  // Load the credentials
  await loadGoogleCredentials();

  // Initialize the Google Cloud Storage client
  const storage = new Storage();
  const bucketName = "gohigh-level-mail";

  const fileName = filePath.split("/").pop();
  await storage.bucket(bucketName).upload(filePath, {
    destination: fileName,
  });

  return `https://storage.googleapis.com/${bucketName}/${fileName}`;
}

module.exports = uploadToGoogleCloud;
