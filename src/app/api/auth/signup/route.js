import bcrypt from "bcryptjs";
import prisma from "@db/prisma"; // Singleton setup for PrismaClient

export async function POST(req) {
  try {
    const body = await req.json(); // Parse JSON request body
    const { fullName, email, password } = body;

    // Validate input
    if (!fullName || !email || !password) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return new Response(
        JSON.stringify({
          error: "Password must be at least 8 characters long",
        }),
        { status: 400 }
      );
    }

    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(
        JSON.stringify({
          error: "A user with this email already exists",
          redirect: "/auth/signin", // Redirect path for existing users
        }),
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 1: Create the user in the database
    const user = await prisma.user.create({
      data: {
        name: fullName,
        email,
        password: hashedPassword,
      },
    });

    // Ensure the user was created successfully
    if (!user || !user.id) {
      return new Response(JSON.stringify({ error: "Failed to create user." }), {
        status: 500,
      });
    }

    // Return the user information (without the password)
    return new Response(
      JSON.stringify({
        user: { id: user.id, email: user.email, name: user.name },
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error(
      process.env.NODE_ENV === "development"
        ? { errorMessage: error.message, errorStack: error.stack }
        : error.message
    );

    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}

export function GET() {
  return new Response(JSON.stringify({ message: "Method not allowed" }), {
    status: 405,
  });
}
