import { getServerSession } from "next-auth/next";
import { authOptions } from "../[...nextauth]/route";

export async function GET(req) {
  try {
    // Properly format the `req` for `getServerSession`
    const session = await getServerSession({ req, authOptions });

    if (!session) {
      return new Response(JSON.stringify({ error: "No active session" }), {
        status: 401,
      });
    }

    return new Response(JSON.stringify({ session }), { status: 200 });
  } catch (error) {
    console.error("Error fetching session:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
