import React from "react";
import { createCheckoutSession } from "../services/stripe";
import toast from "react-hot-toast";

const PlanCard = ({ plan, selectedCycle }) => {
  const price = plan.prices[selectedCycle];

  const handleSelect = async () => {
    try {
      const res = await createCheckoutSession({
        plan: plan.id, // "basic", "pro", or "advanced"
        duration: parseInt(selectedCycle === "monthly" ? 1 : selectedCycle === "quarterly" ? 3 : 12),
        platform_fee_applied: true,
      });

      if (res.checkout_url) {
        window.location.href = res.checkout_url; // ✅ redirect to Stripe
      } else {
        toast.error("Could not redirect to payment.");
      }
    } catch (err) {
      toast.error("Payment error");
      console.error(err);
    }
  };

  return (
    <div className="border border-gray-300 rounded-xl shadow-md p-6 flex flex-col justify-between bg-white hover:shadow-xl transition">
      <div>
        <h3 className="text-2xl font-bold mb-2 text-indigo-600">{plan.name}</h3>
        <p className="text-gray-600 mb-4">{plan.description}</p>
        <p className="text-3xl font-extrabold text-indigo-700">
          ${price.amount / 100}
          <span className="text-sm text-gray-500 ml-1">/{selectedCycle}</span>
        </p>
      </div>

      <button
        onClick={handleSelect}
        className="mt-6 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
      >
        Choose {selectedCycle}
      </button>
    </div>
  );
};

export default PlanCard;
