import { Rocket } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import InfoModal from "../components/infoModal";
import DashboardProgress from "../components/dashboard/DashboardProgress";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardSubject from "../components/dashboard/DashboardSubject";
import DashboardActivity from "../components/dashboard/DashboardActivity";
import StartButton from "../components/dashboard/StartButton";
import useStore from "../store/store";
import { profile } from "../services/auth";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [showInfoModal, setShowInfoModal] = useState(true);
  const subscription = useStore((state) => state?.user?.subscription);
  const plan_type = useStore((state) => state?.user?.subscription?.plan_type);
  const toogleShowUpgradeModal = useStore(
    (state) => state.toogleShowUpgradeModal
  );
  const setUserData = useStore((state) => state?.setUserData);

  const fetchUser = async () => {
    try {
      const user = await profile();
      setUserData(user?.user, user?.user_stats);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      toast.error("Oops!! Something went wrong");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (
      subscription === null ||
      plan_type === "trial" ||
      subscription?.status === "expired" ||
      subscription?.status === "cancelled"
    ) {
      toogleShowUpgradeModal(true);
    }
  }, [plan_type, toogleShowUpgradeModal, subscription]);

  return (
    <>
      {/* {showInfoModal && <InfoModal onClose={() => setShowInfoModal(false)} />} */}
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative">
        <DashboardHeader />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-28">
          {/* Animated Header */}
          <motion.div
            className="text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="inline-block mb-4"
            >
              <Rocket className="w-16 h-16 text-yellow-600" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold pb-2 bg-gradient-to-r from-yellow-700 via-pink-300 to-cyan-300 text-transparent bg-clip-text">
              Learning Wonderland!
            </h1>
            <p className="text-xl text-gray-900">
              Choose your adventure and start learning!
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Subject Selection */}
              <DashboardSubject />
              {/* Activity Selection */}
              <DashboardActivity />
            </div>

            {/* Right Column */}
            <div className="space-y-2">
              {/* Progress Stats */}
              <DashboardProgress />

              {/* Start Button */}
              <StartButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
