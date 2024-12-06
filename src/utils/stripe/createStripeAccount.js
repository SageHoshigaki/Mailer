import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const prisma = new PrismaClient();

export async function createStripeAccount(user) {
  try {
    console.log("Attempting to create Stripe account for user:", user.email);
    const account = await stripe.accounts.create({
      type: "express",
      email: user.email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });

    console.log("Stripe account created:", account.id);

    // Save the Stripe account ID to the user's record in your database
    await prisma.user.update({
      where: { email: user.email },
      data: { stripeAccountId: account.id },
    });

    console.log("Stripe account ID saved to user record");

    return account;
  } catch (error) {
    console.error("Error creating Stripe account for user:", {
      userId: user.id,
      userEmail: user.email,
      errorMessage: error.message,
      errorStack: error.stack,
      errorResponse: error.raw ? error.raw : null,
    });
    throw new Error("Unable to create Stripe account");
  }
}
