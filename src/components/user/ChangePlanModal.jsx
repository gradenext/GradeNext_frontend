import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { profile } from "../../services/auth";
import useStore from "../../store/store";
import { useNavigate } from "react-router-dom";
import { changePlan } from "../../services/stripe";
import plans from "../../constants/plan";
import { Loader2 } from "lucide-react";

export default function ChangePlanModal({
  onClose,
  selectedPlanId,
  selectedCycle,
}) {
  const [loading, setLoading] = useState(false);
  const setUserData = useStore((state) => state.setUserData);
  const navigate = useNavigate();
  const [price, setPrice] = useState(null);
  const [planName, setPlanName] = useState("");
  const [durationNumeric, setDurationNumeric] = useState(null);

  const durationLabels = {
    monthly: "1 month",
    quarterly: "3 months",
    "half-yearly": "6 months",
    yearly: "12 months",
  };

  const durationNumericMap = {
    monthly: 1,
    quarterly: 3,
    "half-yearly": 6,
    yearly: 12,
  };

  useEffect(() => {
    const planData = plans[selectedCycle]?.find((p) => p.id === selectedPlanId);

    if (planData) {
      setPrice((planData.amount / 100).toFixed(0));
      setPlanName(planData.name);
      setDurationNumeric(durationNumericMap[selectedCycle]);
    }
  }, [selectedPlanId, selectedCycle]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await changePlan({
        plan: selectedPlanId === "advanced" ? "enterprise" : selectedPlanId,
        duration: `${durationNumeric}`,
      });
      toast.success("Plan updated successfully");
      onClose();

      // const user = await profile();
      // setUserData(user?.user, user?.user_stats);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 md:p-8 bg-white rounded-xl shadow-lg text-center">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
        Confirm Your Plan Change
      </h2>

      <p className="text-sm md:text-base text-gray-700 mb-2">
        You're switching to the{" "}
        <span className="font-bold text-indigo-600">{planName}</span> plan.
      </p>

      <p className="text-sm md:text-base text-gray-700 mb-4">
        This will be billed for a duration of{" "}
        <span className="capitalize font-semibold">
          {durationLabels[selectedCycle]}
        </span>
        .
      </p>

      {price && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-gray-600 text-sm">Total amount payable</p>
          <p className="text-3xl font-bold text-indigo-700 mt-1 mb-1">
            ${price}
          </p>
          <p className="text-gray-500 text-sm">
            Covers {durationLabels[selectedCycle]} of full access.
          </p>
        </div>
      )}

      <p className="text-xs text-gray-500 mb-6 max-w-md mx-auto">
        By confirming this change, your current subscription will be updated
        immediately. A prorated amount will be applied to your account based on
        the remaining period. Your next billing cycle will reflect the new plan
        and pricing.
      </p>

      <div className="flex justify-center gap-4">
        <button
          onClick={onClose}
          disabled={loading}
          className="px-5 py-2 border cursor-pointer border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition text-sm md:text-base"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`px-5 py-2 rounded-lg flex justify-center items-center gap-x-3 cursor-pointer text-white font-medium transition text-sm md:text-base ${
            loading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading && <Loader2 className=" animate-spin h-4 w-4" />}
          {loading ? "Updating" : "Confirm"}
        </button>
      </div>
    </div>
  );
}
