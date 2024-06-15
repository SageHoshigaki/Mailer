import { NextResponse } from "next/server";
import { transferFunds } from "@stripe/transfer-funds";

export async function POST(req) {
  try {
    const body = await req.json();
    const transfer = await transferFunds(body);
    return NextResponse.json({ transfer });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
