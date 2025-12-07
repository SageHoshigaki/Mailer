import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json(); // Parse JSON body
    const { amount, email, paymentMethodId } = body;

    if (!amount || !email || !paymentMethodId) {
      return new Response(
        JSON.stringify({
          error: "Amount, email, and paymentMethodId are required.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create a PaymentIntent to process the transaction
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents
      currency: "usd", // Transaction currency
      payment_method: paymentMethodId, // Payment method ID from the request
      customer: "cus_RInTFw4jBO5iCv", // Customer ID from Stripe
      confirm: true, // Automatically confirm the PaymentIntent
      receipt_email: email, // Receipt email for Stripe
      description: "Wallet funding for testing", // Optional description
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never", // Prevents redirect-based payment methods
      },
    });

    // Respond with success and PaymentIntent details
    return new Response(
      JSON.stringify({
        success: true,
        paymentIntent,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error funding account:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
