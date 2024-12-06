import prisma from "@db/prisma"; // Adjust the import path based on your structure
import Stripe from "@stripe/config";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { email, paymentMethodId } = req.body;

  if (!email || !paymentMethodId) {
    return res
      .status(400)
      .json({ error: "Email and payment method ID are required." });
  }

  try {
    // Fetch user from the database
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (!user.stripeAccountId) {
      return res
        .status(400)
        .json({ error: "Stripe account ID is missing for this user." });
    }

    // Attach the payment method to the user's Stripe account
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: user.stripeAccountId,
    });

    console.log("Payment method attached successfully:", paymentMethodId);

    // Optionally save the payment method to your database
    await prisma.paymentMethod.create({
      data: {
        stripePaymentMethodId: paymentMethodId,
        userId: user.id,
      },
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error saving payment method:", error);
    res.status(500).json({ error: "Failed to save payment method." });
  }
}
