import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useStore from "../../store/store";

export default function PlanCancelledNotice() {
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
        <AlertCircle className="h-16 w-16 text-orange-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Your Subscription is Cancelled
        </h2>
        <p className="text-gray-600 mb-4">
          Your plan will remain active until the end of the current billing
          cycle. After that, premium features will no longer be available.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Changed your mind? You can reactivate anytime and continue
          uninterrupted access.
        </p>
        <Link
          to="/pricing"
          onClick={() => toogleShowUpgradeModal(false)}
          className="inline-block px-6 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all"
        >
          Upgrade Again
        </Link>
      </div>
    </motion.div>
  );
}
