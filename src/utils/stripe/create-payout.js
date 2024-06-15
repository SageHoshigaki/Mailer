import stripe from "./config";

export const createPayout = async ({
  amount,
  currency,
  connectedAccountId,
}) => {
  try {
    const payout = await stripe.payouts.create({
      amount,
      currency,
      stripe_account: connectedAccountId,
    });
    return payout;
  } catch (error) {
    throw new Error(error.message);
  }
};
