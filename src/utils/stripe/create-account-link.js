import stripe from "./config";

export const createAccountLink = async (account_id) => {
  try {
    const accountLink = await stripe.accountLinks.create({
      account: account_id,
      refresh_url: "https://yourdomain.com/reauth",
      return_url: "https://yourdomain.com/success",
      type: "account_onboarding",
    });
    return accountLink;
  } catch (error) {
    throw new Error(error.message);
  }
};
