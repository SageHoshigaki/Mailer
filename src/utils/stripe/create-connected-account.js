import stripe from "./config";

export const createConnectedAccount = async (email) => {
  try {
    const account = await stripe.accounts.create({
      type: "express",
      country: "US",
      email,
    });
    return account;
  } catch (error) {
    throw new Error(error.message);
  }
};
