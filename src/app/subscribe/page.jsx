"use client";

import { useStripeCheckout } from "@hooks/useStripeCheckout";

export default function SubscribePage() {
  const { redirectToCheckout, loading } = useStripeCheckout();

  const plans = [
    {
      id: "price_1Qq38UCT1xPnWVmc5OSlxPiJ", // Replace with actual Stripe Product ID
      name: "tier-1",
      price: "$83",
      description: "The quickest and easiest way to try our platform.",
      features: ["20 meetings", "View team’s meetings", "Basic AI notes", "Collaborative workspace"],
    },
    {
      id: "prod_STARTER", // Replace with actual Stripe Product ID
      name: "STARTER",
      price: "$15/month",
      description: "For product, design, and research teams.",
      features: ["Unlimited meetings", "10 monthly uploads", "Admin tools", "Advanced AI notes", "Slack integration"],
    },
    {
      id: "prod_BUSINESS", // Replace with actual Stripe Product ID
      name: "BUSINESS",
      price: "$29/month",
      description: "For sales and customer success teams.",
      features: ["Unlimited uploads", "AI Coaching", "Deal boards", "Performance insights", "Salesforce integration"],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center p-6">
      <div className="max-w-5xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8">Subscription Plans</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border border-gray-700 rounded-lg">
          {plans.map((plan, index) => (
            <div key={plan.id} className="p-6 bg-gray-900 relative">
              {/* Top Border for Each Plan */}
              {index > 0 && <div className="absolute top-0 left-0 w-full h-[1px] bg-gray-700"></div>}

              <h2 className="text-xl font-bold text-purple-400">{plan.name}</h2>
              <p className="text-lg font-semibold mt-2">{plan.price}</p>
              <p className="text-gray-400 text-sm mt-2">{plan.description}</p>

              <ul className="mt-4 space-y-2 text-gray-300 text-sm">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    ✅ {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => redirectToCheckout(plan.id)}
                disabled={loading}
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white w-full py-2 rounded-lg transition-all duration-200"
              >
                {loading ? "Processing..." : plan.name === "FREE" ? "Get Started" : "Upgrade"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
