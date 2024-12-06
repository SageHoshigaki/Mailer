// pages/api/wallet/savePaymentMethod.js

import prisma from "@db/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, paymentMethodId, lastFour, brand } = req.body;

  try {
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Save the new payment method
    const paymentMethod = await prisma.paymentMethod.create({
      data: {
        paymentMethodId,
        lastFour,
        brand,
        userId: user.id,
      },
    });

    res.status(200).json({ success: true, paymentMethod });
  } catch (error) {
    console.error("Error saving payment method:", error);
    res.status(500).json({ error: "Failed to save payment method" });
  }
}
