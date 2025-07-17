import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useStore from "../store/store";

export default function PlanRestriction({ requiredPlan }) {
  const toogleShowUpgradeModal = useStore(
    (state) => state.toogleShowUpgradeModal
  );
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow-lg"
    >
      <div className="text-center">
        <AlertCircle className="h-16 w-16 text-purple-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Upgrade Required
        </h2>
        <p className="text-gray-600 mb-4">
          This feature requires the {requiredPlan} plan. Upgrade your account to
          unlock this and other premium features!
        </p>
        <Link
          to="/user/profile"
          onClick={() => toogleShowUpgradeModal(false)}
          className="inline-block px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
        >
          Upgrade Now
        </Link>
      </div>
    </motion.div>
  );
}
