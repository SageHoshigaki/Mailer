import { stripe } from "@/config/stripe";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json({ error: "Missing productId" }, { status: 400 });
    }

    console.log("Received productId:", productId);
    console.log("NEXT_PUBLIC_BASE_URL:", process.env.NEXT_PUBLIC_BASE_URL); // Debug this

    const successUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/session`;
    const cancelUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/subscribe`;

    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      throw new Error("NEXT_PUBLIC_BASE_URL is not defined in .env.local");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: productId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe session error:", error);
    return NextResponse.json(
      { error: error.message || "Stripe session creation failed" },
      { status: 500 }
    );
  }
}
