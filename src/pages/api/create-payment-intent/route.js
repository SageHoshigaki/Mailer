import { NextResponse } from "next/server";
import { createPaymentIntent } from "@stripe/create-payment-intent";

export async function POST(req) {
  try {
    const body = await req.json();
    const paymentIntent = await createPaymentIntent(body);
    return NextResponse.json({ paymentIntent });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
