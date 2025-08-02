import { motion } from "framer-motion";

import useStore from "../../store/store";

const DashboardHeader = () => {
  const student_name = useStore((state) => state?.user?.student_name);

  return (
    <motion.div className="fixed top-0 w-full z-50 bg-gradient-to-r from-sky-100 via-indigo-100 to-purple-100">
      {/* 💻 Message Strip */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60, damping: 10 }}
        className=" px-4 py-3 flex justify-center items-center gap-2"
      >
        <motion.span
          initial={{ rotate: -10 }}
          animate={{ rotate: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-xl"
        >
          💻
        </motion.span>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 1], scale: [0.98, 1.02, 1] }}
          transition={{ duration: 2 }}
          className="text-xl font-semibold text-center bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-600 bg-clip-text text-transparent"
        >
          Welcome {student_name}!
        </motion.h2>

        <motion.span
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-xl"
        >
          🚀
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default DashboardHeader;
