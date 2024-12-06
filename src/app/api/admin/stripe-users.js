// pages/api/admin/stripe-users.js

import Stripe from "@stripe/config";
import prisma from "@db/prisma"; // Adjust the path as necessary

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Fetch all Stripe accounts
    const stripeAccounts = await stripe.accounts.list({ limit: 100 });

    // Fetch all users from Prisma to compare
    const dbUsers = await prisma.user.findMany();
    const dbUserEmails = dbUsers.map((user) => user.email);

    // Filter out Stripe accounts that are not in the Prisma database
    const stripeOnlyAccounts = stripeAccounts.data.filter(
      (account) => !dbUserEmails.includes(account.email)
    );

    res.status(200).json(stripeOnlyAccounts);
  } catch (error) {
    console.error("Error fetching Stripe users:", error.message);
    res.status(500).json({ message: "Failed to fetch Stripe users" });
  }
}
