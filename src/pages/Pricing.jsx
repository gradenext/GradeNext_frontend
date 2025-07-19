import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlanCard from "../components/PlanCard";
import useStore from "../store/store";
import { createCheckoutSession } from "../services/stripe";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import plans from "../constants/plan";
import CheckoutModal from "../components/CheckoutModal";

const Pricing = () => {
  const navigate = useNavigate();
  const [selectedCycle, setSelectedCycle] = useState("monthly");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  const handleCheckout = async () => {
    if (!selectedPlan) return;
    const duration =
      selectedCycle === "monthly" ? 1 : selectedCycle === "quarterly" ? 3 : 12;
    const platform_fee_applied = true;

    try {
      const res = await createCheckoutSession({
        plan: selectedPlan.id,
        duration,
        platform_fee_applied,
      });

      if (res.checkout_url) {
        window.location.href = res.checkout_url;
      } else {
        toast.error("Could not redirect to payment.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Payment error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 md:py-16">
      <h1 className="text-center text-3xl md:text-5xl font-bold text-indigo-700 mb-10">
        Choose Your Plan
      </h1>

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {["monthly", "quarterly", "half-yearly", "yearly"].map((cycle) => (
          <button
            key={cycle}
            onClick={() => setSelectedCycle(cycle)}
            className={`px-5 py-2 rounded-full capitalize border text-sm md:text-base font-medium transition cursor-pointer ${
              selectedCycle === cycle
                ? "bg-indigo-600 text-white border-indigo-600 shadow"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCycle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full mx-auto px-4"
        >
          {plans[selectedCycle].map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8"
            >
              <PlanCard
                plan={plan}
                selectedCycle={selectedCycle}
                onClick={() => handlePlanSelect(plan)}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="mt-16 flex justify-center">
        <button
          onClick={() => {
            navigate("/dashboard");
          }}
          className="rounded-full cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 text-sm font-medium transition"
        >
          Dismiss and Go to Dashboard
        </button>
      </div>

      {/* Plan Modal */}
      <CheckoutModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`Buy ${selectedPlan?.name} - ${selectedCycle} Plan`}
        selectedPlan={selectedPlan}
        selectedCycle={selectedCycle}
        handleCheckout={handleCheckout}
      />
    </div>
  );
};

export default Pricing;
