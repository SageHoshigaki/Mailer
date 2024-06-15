import { NextResponse } from "next/server";
import { createPayout } from "@stripe/create-payout";

export async function POST(req) {
  try {
    const body = await req.json();
    const payout = await createPayout(body);
    return NextResponse.json({ payout });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
