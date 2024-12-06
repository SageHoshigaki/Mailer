import Stripe from "stripe";
import prisma from "@db/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json(); // Parse JSON request body
    const { email } = body;

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
      });
    }

    // Fetch the user by email from your database
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    // If user doesn't have a Stripe account ID, create one and save it
    if (!user.stripeAccountId) {
      try {
        const customer = await stripe.customers.create({ email });

        // Update user with the new Stripe account ID
        user = await prisma.user.update({
          where: { email },
          data: { stripeAccountId: customer.id },
        });
      } catch (stripeError) {
        console.error("Stripe error:", stripeError);
        return new Response(
          JSON.stringify({ error: "Error creating Stripe customer" }),
          { status: 500 }
        );
      }
    }

    return new Response(
      JSON.stringify({ success: true, stripeAccountId: user.stripeAccountId }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating or retrieving Stripe account:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}

export function GET() {
  return new Response(JSON.stringify({ message: "Method not allowed" }), {
    status: 405,
  });
}
