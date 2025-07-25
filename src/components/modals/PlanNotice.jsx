import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useStore from "../../store/store";

export default function PlanNotice() {
  const toogleShowUpgradeModal = useStore(
    (state) => state.toogleShowUpgradeModal
  );
  const plan = useStore((state) => state?.user?.subscription?.plan);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow-lg"
    >
      <div className="text-center">
        <AlertCircle className="h-16 w-16 text-blue-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          You're on the <span className="capitalize underline font-extrabold">{plan}</span> Plan
        </h2>
        <p className="text-gray-600 mb-4">
          Unlock powerful premium features such as advanced analytics, enhanced
          tools, and priority support by upgrading your plan.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Take your experience to the next level — explore our flexible
          subscription options.
        </p>
        <Link
          to="/pricing"
          onClick={() => toogleShowUpgradeModal(false)}
          className="inline-block px-6 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg hover:from-blue-700 hover:to-teal-600 transition-all"
        >
          Upgrade to Premium
        </Link>
      </div>
    </motion.div>
  );
}
