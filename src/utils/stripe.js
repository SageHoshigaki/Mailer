import stripe from "stripe";

const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

export const createStripeAccount = async (user) => {
  const account = await stripeClient.accounts.create({
    type: "standard",
    email: user.email,
  });

  // Update user in the database with Stripe account ID
  await prisma.user.update({
    where: { id: user.id },
    data: { stripeAccountId: account.id },
  });
};
