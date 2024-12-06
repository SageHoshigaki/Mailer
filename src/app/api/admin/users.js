// pages/api/admin/users.js

import prisma from "@db/prisma"; // Adjust the path as necessary
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Fetch all users from Prisma
    const users = await prisma.user.findMany();

    // Optionally, fetch corresponding Stripe accounts for each user
    const usersWithStripe = await Promise.all(
      users.map(async (user) => {
        const stripeAccount = await stripe.accounts.retrieve(
          user.stripeAccountId
        );
        return { ...user, stripeAccount };
      })
    );

    res.status(200).json(usersWithStripe);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ message: "Failed to fetch users" });
  }
}
