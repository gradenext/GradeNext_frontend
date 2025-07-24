import { motion } from "framer-motion";
import useStore from "../../store/store";
import toast from "react-hot-toast";
import { changePlan } from "../../services/stripe";
import { useState } from "react";

const cycleLabel = {
  1: "Monthly",
  3: "Quarterly",
  6: "Half-Yearly",
  12: "Yearly",
};

export default function ChangePlanModal({
  onClose,
  selectedPlan,
  selectedCycle,
}) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await changePlan({ plan: selectedPlan, duration: selectedCycle });
      toast.success("Plan updated successfully");
      onClose(); // Close modal on success
    } catch (error) {
      toast.error(error?.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow-xl border"
    >
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Confirm Plan Change
        </h2>
        <p className="text-gray-600">You are about to switch to:</p>

        <div className="bg-gray-100 p-4 rounded-lg text-left">
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Plan:</span>{" "}
            <span className="capitalize">{selectedPlan}</span>
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Billing Cycle:</span>{" "}
            {cycleLabel[selectedCycle] || `${selectedCycle} months`}
          </p>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          You will be redirected to complete payment (if applicable).
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Confirm & Continue"}
          </button>
          <button
            onClick={onClose}
            disabled={loading}
            className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  );
}
