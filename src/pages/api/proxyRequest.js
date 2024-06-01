import axios from "axios";
import axiosRetry from "axios-retry";

const axiosInstance = axios.create({
  timeout: 60000, // 60 seconds
  responseType: "arraybuffer",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosRetry(axiosInstance, {
  retries: 3, // Number of retries
  retryDelay: (retryCount) => {
    return retryCount * 2000; // Time interval between retries in milliseconds
  },
  retryCondition: (error) => {
    // Retry on network errors or 5xx status codes
    return error.response?.status >= 500 || error.code === "ECONNABORTED";
  },
});

export default async function handler(req, res) {
  const { url, entryId } = req.body;

  try {
    const response = await axiosInstance.post(process.env.PUPPET_REMOTE, {
      url,
      entryId,
    });

    // Return the response data as a buffer
    res.setHeader("Content-Type", "application/pdf");
    res.status(200).send(response.data);
  } catch (error) {
    console.error("Error in proxyRequest:", error);
    res
      .status(500)
      .json({ message: "Error in proxyRequest", error: error.message });
  }
}
