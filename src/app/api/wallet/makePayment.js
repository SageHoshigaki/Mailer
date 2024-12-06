// pages/api/wallet/makePayment.js
import { makeWalletPayment } from "@/digitalWallet/walletService";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId, amount } = req.body;

    try {
      const result = await makeWalletPayment(userId, amount);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error processing payment:", error);
      res.status(500).json({ error: "Failed to process payment" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
