import { NextResponse } from "next/server";
import saveMailData from "@utils/db/saveMailData";
import { ensureRedisConnection } from "@utils/redis/redisManager";

export async function POST(req) {
  try {
    await ensureRedisConnection();

    // 🔥 Directly parse JSON (no `data` wrapping)
    const body = await req.json();

    console.log("✅ Received Request Body:", body);
    console.log("🔍 Keys present in request body:", Object.keys(body));

    // Check if required fields exist
    const requiredFields = ["contact_ToReceiverName", "document_url"];
    const missingFields = requiredFields.filter((field) => !(field in body));

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 }
      );
    }

    console.log("✅ All required fields found. Proceeding to save data...");

    const savedData = await saveMailData(body);
    console.log("📩 Mail data saved successfully:", savedData);

    return NextResponse.json(
      { success: true, message: "Mail data saved and queued successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ API handler encountered an error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
