// pages/api/wallet/checkCreateStripeCustomer.js

import Stripe from "stripe";
import prisma from "@db/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // Fetch the user by email from your database
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // If user doesn't have a Stripe account ID, create one and save it
    if (!user.stripeAccountId) {
      try {
        const customer = await stripe.customers.create({ email });

        // Update user with the new Stripe account ID
        user = await prisma.user.update({
          where: { email },
          data: { stripeAccountId: customer.id },
        });
      } catch (stripeError) {
        console.error("Stripe error:", stripeError);
        return res
          .status(500)
          .json({ error: "Error creating Stripe customer" });
      }
    }

    res
      .status(200)
      .json({ success: true, stripeAccountId: user.stripeAccountId });
  } catch (error) {
    console.error("Error creating or retrieving Stripe account:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
