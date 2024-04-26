const fs = require("fs").promises; // Note the use of .promises
const path = require("path");

/**
 * Asynchronously renames a downloaded PDF file by appending the entryId and the current timestamp.
 * @param {string} filePath - The full path to the PDF file.
 * @param {string} entryId - A unique identifier for the entry.
 * @returns {Promise<string>} The new path of the renamed file.
 */
async function renameDownloadedFile(filePath, entryId) {
  const directory = path.dirname(filePath);
  const originalName = path.basename(filePath);
  const newName = `${path.parse(originalName).name}_${entryId}_${Date.now()}${
    path.parse(originalName).ext
  }`;
  const newPath = path.join(directory, newName);

  await fs.rename(filePath, newPath);
  return newPath;
}

module.exports = renameDownloadedFile;
