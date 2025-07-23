import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useStore from "../../store/store";


export default function PlanExpiredNotice() {
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
        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Your Plan Has Expired
        </h2>
        <p className="text-gray-600 mb-4">
          Your access to premium features has ended. To continue using the full
          functionality of the platform, please choose a subscription plan.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Don’t worry — your data is safe, and you can resume right where you
          left off once you upgrade.
        </p>
        <Link
          to="/pricing"
          onClick={() => toogleShowUpgradeModal(false)}
          className="inline-block px-6 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:from-red-700 hover:to-pink-700 transition-all"
        >
          Upgrade Now
        </Link>
      </div>
    </motion.div>
  );
}
