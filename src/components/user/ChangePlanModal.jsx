import { motion } from "framer-motion";
import useStore from "../../store/store";
import toast from "react-hot-toast";
import { changePlan } from "../../services/stripe";
import { useState } from "react";

const plans = ["Basic", "Pro", "Advanced"];
const cycles = [1, 3, 6, 12];

export default function ChangePlanModal({ onClose }) {
  const user = useStore((state) => state.user);
  const [selectedPlan, setSelectedPlan] = useState(user?.subscription?.plan);
  const [selectedCycle, setSelectedCycle] = useState(
    user?.subscription?.duration / 30 || 1
  );
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
      className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow-lg"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Change Your Plan
        </h2>
        <p className="text-gray-600 mb-6">
          Choose a new plan and billing cycle below.
        </p>

        <div className="mb-6">
          <p className="text-gray-700 mb-2 font-medium">Choose a Plan:</p>
          <div className="flex justify-center flex-wrap gap-3">
            {plans.map((plan) => (
              <button
                key={plan}
                onClick={() => setSelectedPlan(plan)}
                className={`px-4 py-2 rounded-full border ${
                  selectedPlan === plan
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-800 border-gray-300"
                } hover:bg-blue-50 transition`}
              >
                {plan}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 mb-2 font-medium">
            Billing Cycle (in months):
          </p>
          <div className="flex justify-center flex-wrap gap-3">
            {cycles.map((cycle) => (
              <button
                key={cycle}
                onClick={() => setSelectedCycle(cycle)}
                className={`px-4 py-2 rounded-full border ${
                  selectedCycle === cycle
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-gray-800 border-gray-300"
                } hover:bg-green-50 transition`}
              >
                {cycle} {cycle === 1 ? "month" : "months"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Confirm Change"}
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
