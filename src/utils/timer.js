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

module.exports = { waitForDownload };
