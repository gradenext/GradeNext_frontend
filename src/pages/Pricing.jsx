import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlanCard from "../components/PlanCard";
import { AnimatePresence, motion } from "framer-motion";
import useStore from "../store/store";

const plans = [
  {
    id: "basic",
    name: "Basic",
    description: "Access to Practice Quest",
    prices: {
      monthly: { amount: 1900, stripe_price_id: "price_1_month_basic" },
      quarterly: { amount: 5100, stripe_price_id: "price_1_quarter_basic" },
      yearly: { amount: 19000, stripe_price_id: "price_1_year_basic" },
    },
  },
  {
    id: "pro",
    name: "Pro",
    description: "Practice + Time Travel access",
    prices: {
      monthly: {
        amount: 4900,
        stripe_price_id: "price_1RlxaUGb17a8LOzTQyhxORgb",
      },
      quarterly: { amount: 13500, stripe_price_id: "price_1_quarter_pro" },
      yearly: { amount: 49000, stripe_price_id: "price_1_year_pro" },
    },
  },
  {
    id: "advanced",
    name: "Advanced",
    description: "Full access: Practice, Time Travel & Treasure Hunt",
    prices: {
      monthly: { amount: 9900, stripe_price_id: "price_1_month_advanced" },
      quarterly: { amount: 27000, stripe_price_id: "price_1_quarter_advanced" },
      yearly: { amount: 99000, stripe_price_id: "price_1_year_advanced" },
    },
  },
];

const Pricing = () => {
  const [selectedCycle, setSelectedCycle] = useState("monthly");
  const navigate = useNavigate();

  const { setTooglePricing, toogleShowUpgradeModal } = useStore();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 md:py-16">
      <h1 className="text-center text-3xl md:text-5xl font-bold text-indigo-700 mb-10">
        Choose Your Plan
      </h1>

      {/* Cycle Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {["monthly", "quarterly", "yearly"].map((cycle) => (
          <button
            key={cycle}
            onClick={() => setSelectedCycle(cycle)}
            className={`px-5 py-2 rounded-full border text-sm md:text-base font-medium transition cursor-pointer ${
              selectedCycle === cycle
                ? "bg-indigo-600 text-white border-indigo-600 shadow"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
          </button>
        ))}
      </div>

      {/* Plan Cards with Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCycle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-4"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8"
            >
              <PlanCard plan={plan} selectedCycle={selectedCycle} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Dismiss Button */}
      <div className="mt-16 flex justify-center">
        <button
          onClick={() => {
            setTooglePricing(false);
            toogleShowUpgradeModal(true);
            navigate("/dashboard");
          }}
          className="rounded-full cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 text-sm font-medium transition"
        >
          Dismiss and Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Pricing;
