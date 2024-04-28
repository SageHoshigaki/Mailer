import dotenv from "dotenv";
import axios from "axios";
import { URLSearchParams } from "url";

dotenv.config();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { code } = req.query;

    // Check if code is present
    if (code) {
      // Parameters needed for token exchange
      const params = new URLSearchParams();
      params.append("client_id", process.env.GOCLIENT_ID);
      params.append("client_secret", process.env.GOCLIENT_SECRET);
      params.append("grant_type", "authorization_code");
      params.append("code", code);
      params.append("redirect_uri", process.env.REDIRECT_URI); // Make sure this matches the redirect URI registered with the OAuth provider

      try {
        // Exchange code for an access token
        const tokenResponse = await axios.post(
          "https://services.leadconnectorhq.com/oauth/token",
          params,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        // Here you might want to save the token or do something with it
        console.log(tokenResponse.data);

        // Redirect user after successful token exchange or handle token
        res.status(200).json({
          success: true,
          message: "OAuth token retrieved successfully.",
          data: tokenResponse.data,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: "Error exchanging OAuth token.",
          error: error.response.data,
        });
      }
    } else {
      // No code in the query string
      res.status(400).json({
        success: false,
        message: "No authorization code found in the request",
      });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
