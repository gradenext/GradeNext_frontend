import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useStore from "../../store/store";
import { Rocket, Sparkles } from "lucide-react";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const { logout } = useStore();

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 70, damping: 12 }}
      className=" fixed top-0 w-full flex justify-between items-center  gap-3 bg-gradient-to-r from-sky-200 via-indigo-100 to-purple-200 border-b border-blue-300 text-center py-4 px-4 shadow-md z-50 "
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className=" flex items-center space-x-2 px-4 py-2 rounded-xl shadow-lg transition-all duration-200 cursor-pointer"
        style={{
          background: "linear-gradient(135deg, #6bc1ff 0%, #8ed1ff 100%)",
        }}
        onClick={() => navigate("/user/profile")}
      >
        <img
          src="https://api.dicebear.com/9.x/adventurer/svg?seed=Nolan"
          alt="Avatar"
          className="w-8 h-8 rounded-full border-2 border-white"
        />
      </motion.button>

      <motion.div className="flex justify-between items-center gap-x-4">
        <motion.span
          initial={{ rotate: -10 }}
          animate={{ rotate: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-2xl sm:text-3xl"
        >
          💻
        </motion.span>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 1], scale: [0.95, 1.05, 1] }}
          transition={{ duration: 2 }}
          className="text-base sm:text-lg md:text-xl font-semibold bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-600 bg-clip-text text-transparent"
        >
          We're actively improving this platform — exciting updates coming soon!
        </motion.h2>

        <motion.span
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-2xl sm:text-3xl"
        >
          🚀
        </motion.span>
      </motion.div>

      <motion.button
        onClick={() => logout()}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className=" flex items-center space-x-2 px-4 py-2 rounded-xl shadow-lg transition-all duration-200 cursor-pointer"
        style={{
          background: "linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)",
        }}
      >
        <Sparkles className="w-5 h-5 text-white" />
        <span className="text-white text-lg">Blast Off!</span>
        <Rocket className="w-5 h-5 text-white animate-bounce" />
      </motion.button>
    </motion.div>
  );
};

export default DashboardHeader;
