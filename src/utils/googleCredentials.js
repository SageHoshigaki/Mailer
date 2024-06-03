const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
dotenv.config();

async function loadGoogleCredentials() {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS_BASE64) {
    const credentials = Buffer.from(
      process.env.GOOGLE_APPLICATION_CREDENTIALS_BASE64,
      "base64"
    ).toString("utf-8");
    const credentialsPath = path.join("/tmp", "credentials.json");

    // Write the credentials to a file
    fs.writeFileSync(credentialsPath, credentials);

    // Set the environment variable to point to the credentials file
    process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialsPath;

    return credentialsPath;
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS_PATH) {
    const credentialsPath = path.resolve(
      __dirname,
      process.env.GOOGLE_APPLICATION_CREDENTIALS_PATH
    );

    // Set the environment variable to point to the credentials file
    process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialsPath;

    return credentialsPath;
  } else {
    throw new Error(
      "Google credentials are not set in the environment variables."
    );
  }
}

module.exports = { loadGoogleCredentials };
