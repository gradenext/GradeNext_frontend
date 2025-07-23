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

  const [showCancel, setShowCancel] = useState(false);
  const [showChange, setShowChange] = useState(false);

  if (!user || !user.subscription) return null;

  const isTrial = user.subscription.plan_type !== "trial";

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

      {/* Subscription Status Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-2xl shadow-lg border text-center"
        style={{
          borderColor: `${colors.accent}30`,
          background: `linear-gradient(to bottom right, ${colors.background}, white)`,
          boxShadow: `0 4px 16px ${colors.accent}20`,
        }}
      >
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          {isTrial ? "You're on a Trial Plan" : `Current Plan: ${user.plan}`}
        </h2>
        <p className="text-gray-600 mb-4">
          {isTrial ? (
            <>
              Your trial ends in
              <span className="font-semibold text-orange-500">
                {" "}
                {user.trial_expired_in_days} days
              </span>
              . Upgrade now to avoid losing access.
            </>
          ) : (
            <>You're enjoying full access to all premium features.</>
          )}
        </p>

        {!isTrial && (
          <button
            onClick={() => navigate("/pricing")}
            className="bg-gradient-to-r cursor-pointer my-4 from-purple-500 to-orange-400 text-white px-6 py-2 rounded-xl font-semibold hover:scale-105 transition"
          >
            Subscribe Now
          </button>
        )}
        <p className="text-sm text-gray-500">
          Plan valid till{" "}
          <span className="font-medium text-gray-700">
            {formatReadableDate(user.subscription.end_date)}
          </span>
        </p>
      </motion.div>

      {/* CTA Banners */}
      {isTrial && (
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
              onClick={() => setShowChange(true)}
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

      {/* Detailed Raw Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl shadow-md p-6 border space-y-4"
        style={{ borderColor: `${colors.success}20` }}
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Plan Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-gray-700 text-base">
          <div>
            <span className="font-semibold">Plan Type:</span>
            <span className="text-xl font-bold text-indigo-600 block capitalize">
              {user.subscription.plan_type}
            </span>
          </div>
          <div>
            <span className="font-semibold">Days Left in Trial:</span>
            <span className="text-xl font-bold text-orange-500 block">
              {user.trial_expired_in_days}
            </span>
          </div>
          <div>
            <span className="font-semibold">Trial Expired:</span>
            <span className="text-xl font-bold text-red-500 block capitalize">
              {user.is_trial_expired ? "Yes" : "No"}
            </span>
          </div>

          <div>
            <span className="font-semibold">Subscription Status:</span>
            <span className="text-xl font-bold text-green-600 block capitalize">
              {user.subscription.status}
            </span>
          </div>
          <div>
            <span className="font-semibold">Start Date:</span>
            <span className="block">
              {formatReadableDate(user.subscription.start_date)}
            </span>
          </div>
          <div>
            <span className="font-semibold">End Date:</span>
            <span className="block">
              {formatReadableDate(user.subscription.end_date)}
            </span>
          </div>
        </div>
      </motion.div>

      <Modal
        isOpen={showCancel}
        title={"Cancel you plan"}
        onClose={() => setShowCancel(false)}
      >
        <CancelModal onClose={() => setShowCancel(false)} />
      </Modal>
      <Modal
        isOpen={showChange}
        title={"Change you plan"}
        // onClose={() => setShowChange(false)}
        onClose={() => {}}
      >
        <ChangePlanModal onClose={() => setShowChange(false)} />
      </Modal>
    </div>
  );
};

export default SubscriptionPage;
