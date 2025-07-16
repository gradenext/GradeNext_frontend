import React from "react";
import { createCheckoutSession } from "../services/stripe";
import toast from "react-hot-toast";
import { CheckCircle } from "lucide-react";

const PlanCard = ({ plan, selectedCycle }) => {
  const price = plan.prices[selectedCycle];

  const handleSelect = async () => {
    try {
      const res = await createCheckoutSession({
        plan: plan.id,
        duration:
          selectedCycle === "monthly"
            ? 1
            : selectedCycle === "quarterly"
            ? 3
            : 12,
        platform_fee_applied: true,
      });

      if (res.checkout_url) {
        window.location.href = res.checkout_url;
      } else {
        toast.error("Could not redirect to payment.");
      }
    } catch (err) {
      toast.error("Payment error");
      console.error(err);
    }
  };

  return (
    <div className="group relative h-full transform overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-2xl hover:border-indigo-400 hover:scale-[1.02] flex flex-col justify-between">
      {/* Plan Header */}
      <div>
        <h3 className="text-2xl font-bold text-indigo-700 mb-2">{plan.name}</h3>
        <p className="text-gray-600 text-sm mb-6">{plan.description}</p>

        <div className="flex items-end space-x-1">
          <p className="text-4xl font-extrabold text-indigo-800">
            ${price.amount / 100}
          </p>
          <span className="text-base text-gray-500 font-medium">
            /{selectedCycle}
          </span>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={handleSelect}
        className="mt-8 w-full cursor-pointer rounded-lg bg-indigo-600 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
      >
        Choose {plan.name}
      </button>

      {/* Optional icon at top-right for polish */}
      <CheckCircle className="absolute top-4 right-4 h-5 w-5 text-indigo-300 opacity-0 group-hover:opacity-100 transition" />
    </div>
  );
};

export default PlanCard;
