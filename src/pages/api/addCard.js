import { getSession } from "next-auth/react";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

const addCard = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { token } = req.body;

  try {
    // Retrieve the customer from your database or session
    const customer = await stripe.customers.retrieve(session.userId);

    // Create a new source using the token and attach it to the customer
    const source = await stripe.customers.createSource(customer.id, {
      source: token,
    });

    return res.status(200).json({ message: "Card added successfully", source });
  } catch (error) {
    console.error("Error adding card:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default addCard;
