import stripe from "./config";

export const createPaymentIntent = async ({
  amount,
  currency,
  paymentMethodId,
  customerId,
}) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethodId,
      customer: customerId,
      off_session: true,
      confirm: true,
    });
    return paymentIntent;
  } catch (error) {
    throw new Error(error.message);
  }
};
