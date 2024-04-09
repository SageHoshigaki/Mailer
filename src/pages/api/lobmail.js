import axios from "axios";
import fs from "fs"; // Node.js filesystem module

// Function to send LobMail with attachment from Google Cloud Storage
export async function sendLobMail(apiKey, toAddress, fromAddress, pdfPath) {
  try {
    // Download PDF file from Google Cloud Storage
    const pdfData = await axios.get(pdfPath, { responseType: "arraybuffer" });
    fs.writeFileSync("temp.pdf", pdfData.data); // Write PDF to local file

    // Lob API endpoint for creating a letter
    const endpoint = "https://api.lob.com/v1/letters";

    // Lob API request payload
    const payload = {
      to: toAddress,
      from: fromAddress,
      color: true, // Color printing
      certified: true, // Certified mail option
      file: fs.createReadStream("temp.pdf"), // Attach the PDF file
    };

    // Lob API request headers
    const headers = {
      Authorization: `Basic ${Buffer.from(apiKey + ":").toString("base64")}`,
      "Content-Type": "multipart/form-data", // Set content type for file upload
    };

    // Send request to Lob API
    const response = await axios.post(endpoint, payload, { headers });

    // Handle response from Lob API
    if (response.status === 200) {
      console.log("Letter sent successfully.");
      return true; // Return true if successful
    } else {
      console.error("Error sending letter:", response.data);
      return false; // Return false if unsuccessful
    }
  } catch (error) {
    console.error("Error sending letter:", error.message);
    return false; // Return false if error occurs
  }
}
