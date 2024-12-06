import Stripe from "@stripe/config";
import prisma from "@db/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { email } = req.body;

  if (!email) {
    console.error("Email is missing in the request body.");
    return res.status(400).json({ error: "Email is required." });
  }

  try {
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      console.error("User not found:", email);
      return res.status(404).json({ error: "User not found." });
    }

    if (!user.stripeAccountId) {
      console.log(`No customer ID for user: ${email}, creating one.`);
      const customer = await stripe.customers.create({ email: user.email });
      user = await prisma.user.update({
        where: { email },
        data: { stripeAccountId: customer.id },
      });
    } else {
      try {
        // Verify the existing customer ID
        await stripe.customers.retrieve(user.stripeAccountId);
      } catch (error) {
        if (error.code === "resource_missing") {
          console.log(`Invalid customer ID for user: ${email}, recreating.`);
          const customer = await stripe.customers.create({ email: user.email });
          user = await prisma.user.update({
            where: { email },
            data: { stripeAccountId: customer.id },
          });
        } else {
          throw error;
        }
      }
    }

    // Create SetupIntent
    const setupIntent = await stripe.setupIntents.create({
      customer: user.stripeAccountId,
    });

    res.status(200).json({ clientSecret: setupIntent.client_secret });
  } catch (error) {
    console.error("Error in /setupIntent:", error);
    res.status(500).json({ error: "Failed to create SetupIntent." });
  }
}
