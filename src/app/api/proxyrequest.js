import axios from "axios";
import axiosRetry from "axios-retry";
import dotenv from "dotenv";

dotenv.config();

const axiosInstance = axios.create({
  timeout: 90000, // Increase timeout to 90 seconds
  responseType: "arraybuffer",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/pdf",
  },
});

axiosRetry(axiosInstance, {
  retries: 3, // Number of retries
  retryDelay: (retryCount) => retryCount * 2000, // Time interval between retries in milliseconds
  retryCondition: (error) =>
    error.response?.status >= 500 || error.code === "ECONNABORTED",
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { url, entryId } = req.body;
    console.log("Received request:", { url, entryId });

    try {
      const response = await axiosInstance.post(process.env.PUPPET_REMOTE, {
        url,
        entryId,
      });

      console.log("Received response from puppet remote:", response.status);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${entryId}.pdf`
      );
      res.status(200).send(response.data);
    } catch (error) {
      console.error("Error in proxyRequest:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      res
        .status(500)
        .json({ message: "Error in proxyRequest", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
