// digitalWallet/walletService.js
import { createStripeCustomer, createPaymentIntent } from "./stripeIntegration";
import prisma from "../prisma"; // Assuming you're using Prisma ORM for your database

// 1. Create a Stripe customer and store their ID in the database
export const setupWalletForUser = async (
  userId,
  email,
  name,
  phone,
  address
) => {
  const stripeCustomerId = await createStripeCustomer(
    email,
    name,
    phone,
    address
  );

  // Store the Stripe Customer ID in your database
  await prisma.user.update({
    where: { id: userId },
    data: { stripeCustomerId },
  });

  return stripeCustomerId;
};

// 2. Add Funds to Wallet by Creating a PaymentIntent
export const addFundsToWallet = async (userId, amount) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || !user.stripeCustomerId) {
    throw new Error("User does not have a Stripe customer ID");
  }

  // Create PaymentIntent to add funds
  const paymentIntent = await createPaymentIntent(
    user.stripeCustomerId,
    amount
  );
  return paymentIntent;
};

// 3. Deduct Balance for Service Payments
export const makeWalletPayment = async (userId, amount) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.walletBalance < amount) {
    throw new Error("Insufficient balance or user not found");
  }

  // Deduct balance and update the user's wallet balance
  await prisma.user.update({
    where: { id: userId },
    data: { walletBalance: user.walletBalance - amount },
  });

  return { success: true, newBalance: user.walletBalance - amount };
};
