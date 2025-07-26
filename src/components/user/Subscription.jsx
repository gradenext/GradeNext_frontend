import React, { useState } from "react";
import { motion } from "framer-motion";
import useStore from "../../store/store";
import { useNavigate } from "react-router-dom";
import CancelModal from "./CancelModal";
import Modal from "../Modal";
import ChangePlanModal from "./ChangePlanModal";

const colors = {
  primary: "#6366f1",
  secondary: "#FF9F4A",
  accent: "#4ACBFF",
  danger: "#ef4444",
  success: "#10b981",
  background: "#FFF8F0",
};

function formatReadableDate(dateStr) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateStr).toLocaleDateString("en-US", options);
}

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const plan = useStore((state) => state?.user?.subscription?.plan);
  const duration = Math.floor(
    useStore((state) => state?.user?.subscription?.valid_for) / 30
  );

  const [showCancel, setShowCancel] = useState(false);

  if (!user || !user.subscription) return null;

  const isTrial = user?.subscription?.plan_type === "trial";

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1
          className="text-4xl font-extrabold mb-2"
          style={{
            background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Subscription Details
        </h1>
        <p className="text-lg text-gray-600">
          Manage your current plan, learn about benefits, and explore upgrade
          options.
        </p>
        <div
          className="h-1 w-24 mx-auto my-4 rounded-full"
          style={{ background: colors.accent }}
        ></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl shadow-xl border p-6 sm:p-8 bg-gradient-to-br from-white to-gray-50 space-y-6"
        style={{
          borderColor: `${colors.accent}30`,
          boxShadow: `0 8px 24px ${colors.accent}20`,
        }}
      >
        {/* Header: Plan & Trial */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-800">
              You're on a{" "}
              <span className="uppercase font-extrabold text-transparent bg-clip-text bg-gradient-to-r cursor-pointer from-purple-500 to-orange-400">
                {plan}
              </span>{" "}
              Plan
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              {isTrial ? (
                <>
                  Trial ends in{" "}
                  <span className="font-semibold text-orange-500">
                    {user.trial_expired_in_days} days
                  </span>
                  . Upgrade now to continue access.
                </>
              ) : (
                "You have full access to premium features."
              )}
            </p>
          </div>

          {isTrial && (
            <button
              onClick={() => navigate("/pricing")}
              className="bg-gradient-to-r cursor-pointer from-purple-500 to-orange-400 text-white px-6 py-2 rounded-xl font-semibold hover:scale-105 transition duration-200"
            >
              Upgrade Plan
            </button>
          )}
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-gray-700 text-sm sm:text-base">
          <div className="flex flex-col">
            <span className="text-gray-500 font-medium">
              Subscription Status
            </span>
            <span
              className={`text-lg font-semibold capitalize ${
                user.subscription.status === "active"
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {user.subscription.status}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 font-medium">Start of Billing</span>
            <span className="text-lg font-semibold text-gray-800">
              {formatReadableDate(user.subscription.start_date)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 font-medium">Next Billing Date</span>
            <span className="text-lg font-semibold text-gray-800">
              {formatReadableDate(user.subscription.end_date)}
            </span>
          </div>
        </div>
      </motion.div>

      {/* CTA Banners */}
      {!isTrial && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <div className="flex-1 bg-indigo-50 border border-indigo-300 rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-indigo-800 mb-2">
              Want to upgrade or switch plans?
            </h3>
            <p className="text-gray-700 mb-4">
              You can switch to a different plan at any time to better suit your
              learning needs.
            </p>
            <button
              onClick={() => navigate(`/user/plan/${duration}/${plan}`)}
              className="bg-indigo-600 cursor-pointer text-white hover:bg-indigo-700 rounded-xl px-4 py-2 font-semibold transition"
            >
              Change Plan
            </button>
          </div>

          <div className="flex-1 bg-red-50 border border-red-300 rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-red-800 mb-2">
              Want to cancel your subscription?
            </h3>
            <p className="text-gray-700 mb-4">
              Canceling will stop future payments, but you’ll still have access
              until the end of your billing period.
            </p>
            <button
              onClick={() => setShowCancel(true)}
              className="bg-red-600 cursor-pointer text-white hover:bg-red-700 rounded-xl px-4 py-2 font-semibold transition"
            >
              Cancel Plan
            </button>
          </div>
        </motion.div>
      )}

      <Modal
        isOpen={showCancel}
        title={"Cancel you plan"}
        onClose={() => setShowCancel(false)}
      >
        <CancelModal onClose={() => setShowCancel(false)} />
      </Modal>
    </div>
  );
};

export default SubscriptionPage;
