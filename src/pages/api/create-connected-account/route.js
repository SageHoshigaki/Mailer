import { NextResponse } from "next/server";
import { createConnectedAccount } from "@stripe/create-connected-account";

export async function POST(req) {
  try {
    const { email } = await req.json();
    const account = await createConnectedAccount(email);
    return NextResponse.json({ account });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
