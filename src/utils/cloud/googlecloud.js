import { Storage } from "@google-cloud/storage";

// Parse the credentials from the environment variable
const credentials = JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS);

// Initialize the Google Cloud Storage client with the credentials
const storage = new Storage({
  projectId: credentials.project_id,
  credentials: {
    client_email: credentials.client_email,
    private_key: credentials.private_key,
  },
});

const bucketName = "gohigh-level-mail";

async function uploadToGoogleCloud(filePath) {
  const fileName = filePath.split("/").pop();
  await storage.bucket(bucketName).upload(filePath, {
    destination: fileName,
  });

  return `https://storage.googleapis.com/${bucketName}/${fileName}`;
}

module.exports = uploadToGoogleCloud;
