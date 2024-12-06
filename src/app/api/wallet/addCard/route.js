import Stripe from "stripe";
import prisma from "@db/prisma"; // Use the shared Prisma singleton client

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { email, paymentMethodId } = await req.json();

    // Input validation
    if (!email || typeof email !== "string" || !email.includes("@")) {
      console.error(`[${new Date().toISOString()}] Invalid email: ${email}`);
      return new Response(
        JSON.stringify({ error: "Valid email is required." }),
        {
          status: 400,
        }
      );
    }

    if (
      !paymentMethodId ||
      typeof paymentMethodId !== "string" ||
      !paymentMethodId.startsWith("pm_")
    ) {
      console.error(
        `[${new Date().toISOString()}] Invalid payment method ID: ${paymentMethodId}`
      );
      return new Response(
        JSON.stringify({ error: "Valid payment method ID is required." }),
        { status: 400 }
      );
    }

    // Fetch the user from the database
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      console.error(`[${new Date().toISOString()}] User not found: ${email}`);
      return new Response(JSON.stringify({ error: "User not found." }), {
        status: 404,
      });
    }

    // Ensure the user has a Stripe customer ID
    const stripeCustomerId = await getOrCreateStripeCustomer(user);

    // Check if payment method already exists in the database
    const existingPaymentMethod = await prisma.paymentMethod.findUnique({
      where: { stripePaymentMethodId: paymentMethodId },
    });

    if (existingPaymentMethod) {
      console.log(
        `[${new Date().toISOString()}] Payment method already exists: ${paymentMethodId}`
      );
      return new Response(
        JSON.stringify({
          success: true,
          message: "Payment method already exists.",
        }),
        { status: 200 }
      );
    }

    // Attach the payment method to the Stripe customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: stripeCustomerId,
    });

    // Save the payment method in the database
    const savedPaymentMethod = await prisma.paymentMethod.create({
      data: {
        stripePaymentMethodId: paymentMethodId,
        userId: user.id,
      },
    });

    console.log(
      `[${new Date().toISOString()}] Payment method attached and saved:`,
      savedPaymentMethod
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: "Payment method successfully attached.",
      }),
      { status: 200 }
    );
  } catch (error) {
    if (error.type === "StripeCardError") {
      console.error(
        `[${new Date().toISOString()}] Stripe card error:`,
        error.message
      );
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
      });
    }

    console.error(`[${new Date().toISOString()}] Unexpected error:`, error);

    return new Response(
      JSON.stringify({
        error: error.message || "An unexpected error occurred.",
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
