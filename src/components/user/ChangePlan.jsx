import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, FileText, Globe, Zap } from "lucide-react";
import plans from "../../constants/plan";
import Modal from "../Modal";
import ChangePlanModal from "./ChangePlanModal";

const PLAN_FEATURES = {
  basic: [
    "Access to common core syllabus",
    "Limited Math+English practice only",
    "Progress tracking dashboard",
    "Interactive learning activities",
    "No tutor support",
    "Email support",
  ],
  pro: [
    "Access to all Basic features",
    "Covers Math, English & Science subjects",
    "Access to Common core + State syllabus",
    "1:1 tutor support in additional $5 per class.",
    "Unlimited practice & revision exercises",
  ],
  advanced: [
    "All Pro features access",
    "Includes Pro syllabus and advanced courses",
    "Competitive exam-focused plan",
    "Dedicated personalized 1:1 tutor support (Free 1 hour class per week)",
    "Advanced analytics, goal tracking & reports",
    "Priority support & onboarding",
  ],
};

const PLAN_STYLE = {
  basic: {
    bg: "bg-emerald-50",
    icon: <Globe className="text-emerald-500" />,
    text: "text-emerald-600",
  },
  pro: {
    bg: "bg-purple-50",
    icon: <Zap className="text-purple-500" />,
    text: "text-purple-600",
  },
  advanced: {
    bg: "bg-indigo-50",
    icon: <FileText className="text-indigo-500" />,
    text: "text-indigo-600",
  },
};

const durationMap = {
  1: "monthly",
  3: "quarterly",
  6: "half-yearly",
  12: "yearly",
};

const allCycles = ["monthly", "quarterly", "half-yearly", "yearly"];

const ChangePlan = () => {
  const { duration, plan: currentPlan } = useParams();
  const mappedCycle = durationMap[duration];

  const [selectedPlanId, setSelectedPlanId] = useState(currentPlan);
  const [selectedCycle, setSelectedCycle] = useState(mappedCycle);
  const [showChange, setShowChange] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);

  const currentPlanDetails = plans[mappedCycle]?.find(
    (p) => p.id === currentPlan
  );
  const selectedPlanDetails =
    plans[selectedCycle]?.find((p) => p.id === selectedPlanId) || null;

  const isSameAsCurrent =
    selectedPlanId === currentPlan && selectedCycle === mappedCycle;

  // One-time animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setAnimationDone(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="px-4 md:px-8  flex flex-col items-center w-full">
      {/* Responsive Column Layout */}
      <div className="flex flex-col lg:flex-row gap-6 w-full h-full min-h-[480px]">
        {/* Left Column */}
        <div className="w-full lg:w-1/2 flex flex-col gap-y-12 h-full">
          {/* Current Plan Card */}
          <div>
            {currentPlanDetails && (
              <div
                className={`rounded-2xl p-6 border-2 shadow bg-white h-full flex flex-col justify-between ${
                  PLAN_STYLE[currentPlanDetails.id]?.bg || "bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  {PLAN_STYLE[currentPlanDetails.id]?.icon}
                  <h3
                    className={`text-xl font-bold capitalize ${
                      PLAN_STYLE[currentPlanDetails.id]?.text
                    }`}
                  >
                    Current Plan: {currentPlanDetails.name}
                  </h3>
                </div>
                <div className="text-2xl font-bold mt-2 capitalize">
                  ${(currentPlanDetails.amount / 100).toFixed(0)} •{" "}
                  {mappedCycle.replace("-", " ")}
                </div>
                <p className=" text-gray-600 mt-1 text-lg">
                  You’re currently subscribed to the{" "}
                  <strong>{currentPlanDetails.name}</strong> plan.
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-y-6 items-center">
            {/* Duration Selector */}
            <div className="flex flex-wrap gap-2">
              {allCycles.map((cycle) => (
                <button
                  key={cycle}
                  onClick={() => setSelectedCycle(cycle)}
                  className={`px-4 py-2 rounded-full capitalize border text-sm font-medium transition cursor-pointer ${
                    selectedCycle === cycle
                      ? "bg-indigo-600 text-white border-indigo-600 shadow"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {cycle.replace("-", " ")}
                </button>
              ))}
            </div>

            {/* Plan Cards */}
            <motion.div
              className="flex flex-wrap gap-4 pt-2"
              {...(animationDone
                ? {}
                : {
                    initial: { opacity: 0, y: 30 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.3 },
                  })}
            >
              {[
                ...new Map(
                  Object.entries(plans)
                    .flatMap(([cycle, cyclePlans]) =>
                      cyclePlans.map((plan) => ({ ...plan, cycle }))
                    )
                    .map((plan) => [plan.id, plan])
                ).values(),
              ].map((plan) => {
                const style = PLAN_STYLE[plan.id];
                const isSelected = selectedPlanId === plan.id;

                return (
                  <motion.div
                    key={plan.id}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`cursor-pointer border-2 rounded-xl p-4 w-full sm:w-[200px] transition-all ${
                      isSelected
                        ? "border-indigo-600 shadow-md"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {style.icon}
                      <h4 className={`font-semibold ${style.text}`}>
                        {plan.name}
                      </h4>
                    </div>
                    <p className="text-xs text-gray-500">{plan.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Right Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full lg:w-1/2 h-full"
        >
          <div className="h-full">
            {!isSameAsCurrent ? (
              <div className="relative rounded-3xl p-8 shadow-lg border border-gray-200 bg-white h-full flex flex-col justify-between overflow-hidden">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-full bg-gray-100 shadow-inner">
                        {PLAN_STYLE[selectedPlanDetails.id]?.icon}
                      </div>
                      <h3
                        className={`text-2xl md:text-3xl font-bold tracking-tight ${
                          PLAN_STYLE[selectedPlanDetails.id]?.text ||
                          "text-gray-800"
                        }`}
                      >
                        {selectedPlanDetails.name} Plan
                      </h3>
                    </div>

                    {/* Plan Badge */}
                    <span
                      className={`px-3 py-1 text-xl font-semibold rounded-full capitalize ${
                        PLAN_STYLE[selectedPlanDetails.id]?.bg || "bg-gray-100"
                      } ${
                        PLAN_STYLE[selectedPlanDetails.id]?.text ||
                        "text-gray-800"
                      }`}
                    >
                      {selectedCycle.replace("-", " ")}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-5xl font-extrabold text-gray-900 block leading-none">
                      ${Number(selectedPlanDetails.amount / 100).toFixed(0)}
                    </span>
                    <span className=" text-gray-500 mt-1 block text-lg underline font-bold">
                      Billed {selectedCycle.replace("-", " ")}
                    </span>
                  </div>

                  {/* Features */}
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                      What's included
                    </h4>
                    <ul className="space-y-3 text-sm text-gray-700">
                      {(PLAN_FEATURES[selectedPlanDetails.id] || []).map(
                        (feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl  border border-dashed border-gray-300 p-6 flex items-center justify-center text-gray-500 min-h-[400px] text-center bg-white shadow-sm">
                <p className="text-base font-medium">
                  Select a new plan or duration to continue
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-center w-full mt-6">
        <button
          onClick={() => setShowChange(true)}
          disabled={isSameAsCurrent}
          className={`px-6 py-3 rounded-xl cursor-pointer font-semibold transition shadow-md min-w-[220px] text-base ${
            isSameAsCurrent
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          Continue
        </button>
      </div>

      {/* Modal */}
      <Modal
        isOpen={showChange}
        title="Confirm Plan Change"
        onClose={() => setShowChange(false)}
      >
        <ChangePlanModal
          selectedCycle={selectedCycle}
          selectedPlanId={selectedPlanId}
          onClose={() => setShowChange(false)}
        />
      </Modal>
    </div>
  );
};

export default ChangePlan;
