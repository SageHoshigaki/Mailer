import { NextResponse } from "next/server";
import { payLobService } from "@stripe/pay-lob-service";

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await payLobService(body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
