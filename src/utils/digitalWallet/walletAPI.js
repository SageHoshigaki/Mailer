// /pages/api/digitalWallet/addFunds.js
import { getSession } from "next-auth/react";
import { addFunds } from "@/digitalWallet/walletService";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  if (req.method === "POST") {
    const { amount } = req.body;

    try {
      const newBalance = await addFunds(session.user.id, amount);
      return res.status(200).json({ balance: newBalance });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  res.status(405).json({ message: "Method not allowed" });
}
