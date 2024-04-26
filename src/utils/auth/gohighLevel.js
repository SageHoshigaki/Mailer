import dotenv from "dotenv";
dotenv.config();
const axios = require("axios").default;
const { URLSearchParams } = require("url");

const encodedParams = new URLSearchParams();
encodedParams.set("client_id", process.env.GOCLIENT_ID);
encodedParams.set("client_secret", process.env.GOCLIENT_SECRET);
encodedParams.set("grant_type", "authorization_code");
encodedParams.set("code", "");
encodedParams.set("refresh_token", "");
encodedParams.set("user_type", "");
encodedParams.set("redirect_uri", "http://localhost:3000/api/pennmail");

const options = {
  method: "POST",
  url: "https://services.leadconnectorhq.com/oauth/token",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
  },
  data: encodedParams,
};

try {
  const { data } = await axios.request(options);
  console.log(data);
} catch (error) {
  console.error(error);
}
