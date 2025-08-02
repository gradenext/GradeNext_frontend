import { AlertCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import useStore from "../../store/store";
import { cancelPlan } from "../../services/stripe";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function formatReadableDate(dateStr) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateStr).toLocaleDateString("en-US", options);
}

export default function CancelModal({ onClose }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const endDate = useStore((state) => state.user.subscription.end_date);

  const handleCancel = async () => {
    setLoading(true);
    try {
      await cancelPlan();
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.error);
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
        <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Cancel Subscription?
        </h2>

        <p className="text-gray-600 mb-6">
          Are you sure you want to cancel your plan? You will lose access to
          premium features.
        </p>
        <p className="text-gray-700 mb-2">
          Your subscription will be cancelled on next billing cycle.
        </p>
        <p className="text-lg font-semibold text-gray-900 mb-4">
          {" "}
          {formatReadableDate(endDate)}
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleCancel}
            disabled={loading}
            className="px-6 py-2 flex justify-center items-center gap-x-2 bg-red-600 cursor-pointer hover:bg-red-700 text-white rounded-lg transition"
          >
            {loading && <Loader2 className=" animate-spin h-4 w-4" />}
            Yes, Cancel
          </button>
          <button
            onClick={onClose}
            disabled={loading}
            className="px-6 py-2 border cursor-pointer border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            Keep Plan
          </button>
        </div>
      </div>
    </motion.div>
  );
}
