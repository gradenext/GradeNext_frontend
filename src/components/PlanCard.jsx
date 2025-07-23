import React from "react";
import { CheckCircle, Globe, Zap, FileText } from "lucide-react";

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
    button: "bg-emerald-500 hover:bg-emerald-600",
    text: "text-emerald-600",
  },
  pro: {
    bg: "bg-purple-50",
    icon: <Zap className="text-purple-500" />,
    button: "bg-purple-500 hover:bg-purple-600",
    text: "text-purple-600",
  },
  advanced: {
    bg: "bg-indigo-50",
    icon: <FileText className="text-indigo-500" />,
    button: "bg-indigo-500 hover:bg-indigo-600",
    text: "text-indigo-600",
  },
};

const PlanCard = ({ plan, onClick }) => {
  const price = plan.amount;
  const features = PLAN_FEATURES[plan.id] || [];
  const style = PLAN_STYLE[plan.id] || PLAN_STYLE.basic;
  const isFree = price === 0;
  const isContact = typeof price !== "number";

  return (
    <div
      className={`relative rounded-2xl p-6 lg:p-8 shadow-md  ${style.bg} flex flex-col justify-between h-full`}
    >
      {/* Ribbon for Pro */}
      {plan.id === "pro" && (
        <div className="absolute -top-2 right-0">
          <div className="bg-purple-600 text-white text-xs px-3 py-0.5 rounded-bl-xl rounded-tr-2xl font-semibold shadow">
            ⭐ Recommended
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col space-y-4">
        {/* Icon + Title */}
        <div className="flex items-center gap-2">
          {style.icon}
          <h3 className={`text-xl font-bold ${style.text}`}>{plan.name}</h3>
        </div>

        {/* Price */}
        <div className="text-5xl font-extrabold">
          ${(price / 100).toFixed(0)}
        </div>
        {/* Description */}
        <p className="text-sm text-gray-600">{plan.description}</p>

        {/* Features */}
        <ul className="mt-3 space-y-2 text-sm text-gray-700">
          {features.map((feature, i) => (
            <li key={i} className="flex gap-2 items-start">
              <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <button
        onClick={onClick}
        className={`mt-8 w-full cursor-pointer text-sm font-semibold text-white py-2.5 rounded-lg transition ${style.button}`}
      >
        Choose {plan.name}
      </button>
    </div>
  );
};

export default PlanCard;
