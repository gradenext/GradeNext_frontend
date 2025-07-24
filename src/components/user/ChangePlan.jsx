import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, FileText, Globe, Zap } from "lucide-react";
import plans from "../../constants/plan";
import Modal from "../Modal";
import ChangePlanModal from "./ChangePlanModal";

const PLAN_FEATURES = {
  basic: [
    "Access to foundational courses",
    "Limited practice & revision exercises",
    "Progress tracking dashboard",
    "Interactive learning activities",
    "Email support",
    "Mobile-friendly learning",
  ],
  pro: [
    "Access to all Basic features",
    "1:1 tutor support on additional nominal cost",
    "Topic wise unlimited practice & revision exercises",
    "Weekly test to track performance",
    "Personalized learning insights",
  ],
  advanced: [
    "All Pro features access",
    "Competitive exam-focused plan",
    "Dedicated personalized 1:1 tutor support",
    "Advanced analytics, goal tracking & reports",
    "Goal-based exam planning",
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
  const [showChange, setShowChange] = useState(false);
  const [selectedCycle, setSelectedCycle] = useState(mappedCycle);
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  const cyclePlans = plans[selectedCycle] || [];

  useEffect(() => {
    setSelectedCycle(mappedCycle);
    setSelectedPlanId(null);
  }, [mappedCycle]);

  if (!Array.isArray(cyclePlans) || cyclePlans.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No available plans for this duration.
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 py-6">
      {/* Duration Chips */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {allCycles
          .filter((cycle) => cycle !== mappedCycle)
          .map((cycle) => (
            <button
              key={cycle}
              onClick={() => {
                setSelectedCycle(cycle);
                setSelectedPlanId(null);
              }}
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

      {/* Plan Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCycle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="flex w-full flex-col md:flex-row gap-4 justify-center items-center mx-auto"
        >
          {cyclePlans
            .filter((plan) => plan.id !== currentPlan)
            .map((plan) => {
              const style = PLAN_STYLE[plan.id];
              const features = PLAN_FEATURES[plan.id] || [];
              const isSelected = selectedPlanId === plan.id;

              return (
                <motion.div
                  key={plan.id}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`cursor-pointer transition-all duration-300 border-2 rounded-2xl w-full sm:w-[300px] md:w-[320px] lg:w-[340px] xl:w-[360px] flex-shrink-0 ${
                    isSelected
                      ? "border-indigo-600 shadow-xl"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`relative rounded-2xl p-6 lg:p-8 shadow-md ${style.bg} flex flex-col justify-between h-full min-h-[440px]`}
                  >
                    <div className="flex flex-col space-y-4 flex-grow">
                      <div className="flex items-center gap-2">
                        {style.icon}
                        <h3 className={`text-xl font-bold ${style.text}`}>
                          {plan.name}
                        </h3>
                      </div>

                      <div className="text-5xl font-extrabold">
                        ₹{(plan.amount / 100).toFixed(0)}
                      </div>

                      <p className="text-sm text-gray-600">
                        {plan.description}
                      </p>

                      <ul className="mt-3 space-y-2 text-sm text-gray-700 flex-grow">
                        {features.map((feature, i) => (
                          <li key={i} className="flex gap-2 items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </motion.div>
      </AnimatePresence>

      <Modal
        isOpen={!showChange}
        title={"Cancel you plan"}
        onClose={() => setShowChange(false)}
      >
        <ChangePlanModal
          selectedCycle={selectedCycle}
          selectedPlan={selectedPlanId}
          onClose={() => setShowChange(false)}
        />
      </Modal>
    </div>
  );
};

export default ChangePlan;
