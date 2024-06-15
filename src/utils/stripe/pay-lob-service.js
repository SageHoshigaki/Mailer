import fetch from "node-fetch";
import stripe from "./config";

export const payLobService = async ({
  lobServiceId,
  amount,
  currency,
  customerId,
}) => {
  try {
    const charge = await stripe.paymentIntents.create({
      amount,
      currency,
      customer: customerId,
      description: `Payment for Lob service ${lobServiceId}`,
    });

    const response = await fetch("https://api.lob.com/v1/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LOB_API_KEY}`,
      },
      body: JSON.stringify({
        service_id: lobServiceId,
        amount: amount,
        currency: currency,
      }),
    });

    const lobResponse = await response.json();
    return { charge, lobResponse };
  } catch (error) {
    throw new Error(error.message);
  }
};
