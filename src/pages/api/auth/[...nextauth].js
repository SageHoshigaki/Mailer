import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import AzureADProvider from "next-auth/providers/azure-ad";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@prisma/client"; // Adjust the path as necessary
import { createStripeAccount } from "@/utils/stripe"; // Adjust the path as necessary

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET,
    }),
    AzureADProvider({
      clientId: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
    }),
    // Add other providers if needed
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn({ user, account, profile, isNewUser }) {
      if (isNewUser) {
        await createStripeAccount(user);
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user }) {
      // Add any session logic here
      session.user.id = user.id;
      session.user.role = user.role; // Assuming you have a role attribute in your user model
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (isNewUser) {
        await createStripeAccount(user);
      }
      if (user) {
        token.id = user.id;
        token.role = user.role; // Assuming you have a role attribute in your user model
        token.customAttribute = "Custom Value"; // Add any custom attributes
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
