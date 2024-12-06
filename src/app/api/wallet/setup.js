// pages/api/wallet/setup.js
import { setupWalletForUser } from "@/digitalWallet/walletService";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId, email, name, phone, address } = req.body;

    try {
      const stripeCustomerId = await setupWalletForUser(
        userId,
        email,
        name,
        phone,
        address
      );
      res.status(200).json({ stripeCustomerId });
    } catch (error) {
      console.error("Error setting up wallet:", error);
      res.status(500).json({ error: "Failed to setup wallet" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
