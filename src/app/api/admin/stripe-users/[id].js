// pages/api/admin/stripe-users/[id].js

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Delete the Stripe account
    await stripe.accounts.del(id);

    res.status(200).json({ message: "Stripe account deleted successfully" });
  } catch (error) {
    console.error("Error deleting Stripe account:", error.message);
    res.status(500).json({ message: "Failed to delete Stripe account" });
  }
}
