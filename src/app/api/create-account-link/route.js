import { NextResponse } from "next/server";
import { createAccountLink } from "@stripe/create-account-link";

export async function POST(req) {
  try {
    const { account_id } = await req.json();
    const accountLink = await createAccountLink(account_id);
    return NextResponse.json({ accountLink });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
