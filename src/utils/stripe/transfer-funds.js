import stripe from "./config";

export const transferFunds = async ({ amount, currency, destination }) => {
  try {
    const transfer = await stripe.transfers.create({
      amount,
      currency,
      destination,
    });
    return transfer;
  } catch (error) {
    throw new Error(error.message);
  }
};
