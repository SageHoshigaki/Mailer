// digitalWallet/stripeIntegration.js
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

if (!process.env.STRIPE_SECRET_KEY) {
  console.error(
    "STRIPE_SECRET_KEY is not set. Please check your environment variables."
  );
}

// 1. Create a Stripe Customer
export const createStripeCustomer = async (email, name, phone, address) => {
  try {
    console.log("Creating Stripe customer for email:", email);
    const customer = await stripe.customers.create({
      email,
      name,
      phone,
      address,
    });
    console.log("Stripe customer created successfully:", customer.id);
    return customer.id;
  } catch (error) {
    console.error("Error creating Stripe customer:", error.message);
    throw new Error("Could not create Stripe customer");
  }
};

// 2. Create a PaymentIntent to Add Funds
export const createPaymentIntent = async (stripeCustomerId, amount) => {
  try {
    console.log(
      "Creating PaymentIntent for customer:",
      stripeCustomerId,
      "with amount:",
      amount
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert amount to cents
      currency: "usd",
      customer: stripeCustomerId,
      payment_method_types: ["card"],
    });
    console.log("PaymentIntent created successfully:", paymentIntent.id);
    return paymentIntent;
  } catch (error) {
    console.error("Error creating PaymentIntent:", error.message);
    throw new Error("Could not create PaymentIntent");
  }
};

// 3. Retrieve Customer Payment Methods (if needed for displaying options)
export const getPaymentMethods = async (stripeCustomerId) => {
  try {
    console.log("Fetching payment methods for customer:", stripeCustomerId);
    const paymentMethods = await stripe.paymentMethods.list({
      customer: stripeCustomerId,
      type: "card",
    });
    console.log(
      "Payment methods fetched successfully for customer:",
      stripeCustomerId
    );
    return paymentMethods;
  } catch (error) {
    console.error("Error fetching payment methods:", error.message);
    throw new Error("Could not retrieve payment methods");
  }
};

// 4. Adding A Card (Setup Intent)
export const createSetupIntent = async (stripeCustomerId) => {
  try {
    console.log("Creating SetupIntent for customer:", stripeCustomerId);
    const setupIntent = await stripe.setupIntents.create({
      customer: stripeCustomerId,
      payment_method_types: ["card"],
    });
    console.log(
      "SetupIntent created successfully with client secret:",
      setupIntent.client_secret
    );
    return setupIntent.client_secret;
  } catch (error) {
    console.error("Error creating SetupIntent:", error.message);
    throw new Error("Could not create SetupIntent");
  }
};
