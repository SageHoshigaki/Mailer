import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json(); // Parse JSON request body
    const { email, password, provider } = body;

    // Case 1: Handling OAuth Sign-In (Google, etc.)
    if (provider) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (!token) {
        return new Response(
          JSON.stringify({ message: "OAuth authentication failed" }),
          { status: 401 }
        );
      }

      // Check if the user exists in the database
      let user = await prisma.user.findUnique({
        where: { email: token.email },
      });

      if (!user) {
        // Create a new user if it doesn't exist
        user = await prisma.user.create({
          data: {
            email: token.email,
            name: token.name,
            image: token.picture,
          },
        });
      }

      // Generate a JWT token
      const jwtToken = sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return new Response(JSON.stringify({ token: jwtToken }), { status: 200 });
    }

    // Case 2: Handling Email/Password Sign-In
    if (email && password) {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return new Response(
          JSON.stringify({ message: "Invalid credentials" }),
          { status: 401 }
        );
      }

      const isValid = await compare(password, user.password);

      if (!isValid) {
        return new Response(
          JSON.stringify({ message: "Invalid credentials" }),
          { status: 401 }
        );
      }

      // Generate a JWT token
      const jwtToken = sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return new Response(JSON.stringify({ token: jwtToken }), { status: 200 });
    }

    return new Response(JSON.stringify({ message: "Invalid request" }), {
      status: 400,
    });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}

export function GET() {
  return new Response(JSON.stringify({ message: "Method not allowed" }), {
    status: 405,
  });
}
