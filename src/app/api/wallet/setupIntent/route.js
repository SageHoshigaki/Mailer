import Stripe from "stripe";
import prisma from "@db/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      console.error(`[${new Date().toISOString()}] Email is required.`);
      return new Response(JSON.stringify({ error: "Email is required." }), {
        status: 400,
      });
    }

    // Fetch the user from the database
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      console.error(`[${new Date().toISOString()}] User not found: ${email}`);
      return new Response(JSON.stringify({ error: "User not found." }), {
        status: 404,
      });
    }

    // Ensure the user has a Stripe customer ID
    const stripeCustomerId = await getOrCreateStripeCustomer(user);

    // Create a SetupIntent for the Stripe customer
    const setupIntent = await stripe.setupIntents.create({
      customer: stripeCustomerId,
    });

    console.log(
      `[${new Date().toISOString()}] SetupIntent created for user: ${email}`
    );

    return new Response(
      JSON.stringify({ clientSecret: setupIntent.client_secret }),
      { status: 200 }
    );
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error in setupIntent:`, error);

    return new Response(
      JSON.stringify({
        error: error.message || "Failed to create SetupIntent.",
      }),
      { status: 500 }
    );
  }
}

// Helper function to get or create a Stripe customer
async function getOrCreateStripeCustomer(user) {
  if (!user.stripeAccountId) {
    console.log(
      `[${new Date().toISOString()}] No customer ID for user: ${
        user.email
      }, creating one.`
    );

    const customer = await stripe.customers.create({ email: user.email });

    await prisma.user.update({
      where: { email: user.email },
      data: { stripeAccountId: customer.id },
    });

    return customer.id;
  }

  return user.stripeAccountId;
}
