import axios from "axios";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Helper function to exchange the authorization code for an access token
async function exchangeAuthCodeForToken(code) {
  const params = new URLSearchParams({
    client_id: process.env.GOCLIENT_ID,
    client_secret: process.env.GOCLIENT_SECRET,
    grant_type: "authorization_code",
    code: code,
    redirect_uri: process.env.REDIRECT_URI,
  });

  try {
    const response = await axios.post(
      "https://services.leadconnectorhq.com/oauth/token",
      params.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data; // This contains the access token and refresh token
  } catch (error) {
    console.error(
      "Error exchanging authorization code for token:",
      error.response.data
    );
    throw error;
  }
}

// Helper function to construct the Authorization Page URL
function constructAuthorizationPageUrl() {
  const queryParams = new URLSearchParams({
    response_type: "code",
    client_id: process.env.GOCLIENT_ID,
    redirect_uri: process.env.REDIRECT_URI,
    scope: process.env.SCOPE,
  });

  return `https://marketplace.leadconnectorhq.com/oauth/chooselocation?${queryParams}`;
}

// Next.js API route to handle the OAuth 2.0 flow
export default async function handler(req, res) {
  if (req.method === "GET") {
    if (!req.query.code) {
      // If no code is present, redirect to the OAuth provider's authorization page immediately
      const authUrl = constructAuthorizationPageUrl();
      res.redirect(authUrl);
    } else {
      try {
        // Exchange the authorization code for an access token
        const tokenData = await exchangeAuthCodeForToken(req.query.code);
        // You might want to store the tokens securely

        // Redirect to a success page or handle the token data as needed
        res.redirect("/success-page");
      } catch (error) {
        // Handle errors, such as displaying an error message or redirecting to an error page
        res.status(500).json({ error: "Error in token exchange." });
      }
    }
  } else {
    // If the request method is not GET, return a 405 Method Not Allowed error
    res.status(405).end("Method Not Allowed");
  }
}
