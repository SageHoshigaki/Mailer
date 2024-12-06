import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/**
 * Fetch session data in both server-side and API contexts.
 * @param {Object} req - The request object (from API route or server-side).
 * @param {Object} res - The response object (optional, for API routes).
 * @returns {Promise<Object>} The session object or null.
 */
export async function getSession(req, res = null) {
  try {
    const session = await getServerSession(req, res, authOptions);
    return session || null; // Return the session or null if not available
  } catch (error) {
    console.error("Error fetching session:", error);
    return null; // Return null in case of an error
  }
}
