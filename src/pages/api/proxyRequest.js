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
  retryDelay: (retryCount) => retryCount * 2000, // Time interval between retries in milliseconds
  retryCondition: (error) =>
    error.response?.status >= 500 || error.code === "ECONNABORTED",
});

export default async function handler(req, res) {
  // Check for the 'connect' query parameter for connectivity testing
  if (req.method === "GET" && req.query.test === "connect") {
    try {
      const response = await axiosInstance.get(
        `${process.env.PUPPET_REMOTE_TEST}/connect-test`
      );
      res
        .status(200)
        .json({ message: "Connected to DigitalOcean", data: response.data });
    } catch (error) {
      console.error("Error connecting to DigitalOcean:", error.message);
      res.status(500).json({
        message: "Error connecting to DigitalOcean",
        error: error.message,
      });
    }
    return;
  }

  const { url, entryId } = req.body;

  console.log("Received request:", { url, entryId });

  try {
    const response = await axiosInstance.post(process.env.PUPPET_REMOTE, {
      url,
      entryId,
    });

    console.log("Received response from puppet remote:", response.status);

    res.setHeader("Content-Type", "application/pdf");
    res.status(200).send(response.data);
  } catch (error) {
    console.error("Error in proxyRequest:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      console.error("Request data:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    res
      .status(500)
      .json({ message: "Error in proxyRequest", error: error.message });
  }
}
