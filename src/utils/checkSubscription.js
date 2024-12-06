const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const checkSubscription = async (req, res, next) => {
  const userId = req.user.id; // Assuming user ID is available in the request object
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { subscription: true },
  });

  if (!user || !user.subscription) {
    return res.status(403).json({ error: "No subscription found" });
  }

  const subscription = user.subscription;
  if (!subscription.active) {
    return res.status(403).json({ error: "Subscription is inactive" });
  }

  const lastPaymentDate = new Date(subscription.lastPaymentDate);
  const nextPaymentDate = new Date(lastPaymentDate);
  nextPaymentDate.setDate(lastPaymentDate.getDate() + 30);

  const now = new Date();
  if (now >= nextPaymentDate) {
    try {
      // Create a payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: subscription.amount, // subscription amount in cents
        currency: "usd", // subscription currency
        customer: user.stripeCustomerId, // assuming you store Stripe customer ID
        payment_method: subscription.paymentMethodId, // assuming you store the default payment method ID
        off_session: true,
        confirm: true,
      });

      // Update last payment date
      await prisma.subscription.update({
        where: { id: subscription.id },
        data: { lastPaymentDate: now },
      });

      console.log(`PaymentIntent created: ${paymentIntent.id}`);
    } catch (error) {
      console.error("Error creating payment intent:", error);
      return res.status(500).json({ error: "Failed to process payment" });
    }
  }

  next();
};

module.exports = checkSubscription;
