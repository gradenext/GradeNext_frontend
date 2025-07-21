import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useStore from "../store/store";

export default function PlanRestriction() {
  const toogleShowUpgradeModal = useStore(
    (state) => state.toogleShowUpgradeModal
  );
  const trial_expired_in_days = useStore((state) => state?.user?.trial_expired_in_days);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow-lg"
    >
      <div className="text-center">
        <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          You're on a Free Trial
        </h2>
        <p className="text-gray-600 mb-4">
          You have{" "}
          <span className="font-semibold text-gray-800">{trial_expired_in_days}</span> left
          in your free trial. Upgrade now to continue enjoying premium features
          without interruption.
        </p>
        <Link
          to="/pricing"
          onClick={() => toogleShowUpgradeModal(false)}
          className="inline-block px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
        >
          Upgrade Now
        </Link>
      </div>
    </motion.div>
  );
}
