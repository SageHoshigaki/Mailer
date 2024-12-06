import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import AzureADProvider from "next-auth/providers/azure-ad";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@db/prisma"; // Singleton setup for PrismaClient

// Define authOptions
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET,
    }),
    AzureADProvider({
      clientId: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      console.log("Sign-in attempt with user:", user);

      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
        include: { accounts: true },
      });

      if (existingUser) {
        const existingAccount = existingUser.accounts.find(
          (acc) => acc.provider === account.provider
        );

        if (!existingAccount) {
          console.log(
            `User already exists with a different provider. Redirecting to sign-in page.`
          );
          throw new Error("UserAlreadyExists");
        }

        return true;
      } else {
        await prisma.user.create({
          data: {
            name: user.name,
            email: user.email,
            image: user.image,
            accounts: {
              create: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                type: account.type,
              },
            },
          },
        });
        console.log("New user created.");
        return true;
      }
    },
    async redirect({ url, baseUrl, error }) {
      if (error === "UserAlreadyExists") {
        return `${baseUrl}/auth/signin?error=accountAlreadyExists`;
      }
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role || null;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || null;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/dashboard",
  },
};

// Define and export handlers
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; // Export handlers for HTTP methods
