import { motion } from "framer-motion";

const InfoModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-200 relative text-center"
      >
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          🚧 Temporary Downtime
        </h2>
        <p className="text-gray-700 text-base mb-4">
          Our platform is currently unavailable as we’re making important updates and improvements.
        </p>
        <p className="text-gray-700 text-base mb-6">
          Please check back soon. We appreciate your patience and support! 🙏
        </p>
        <button
          onClick={onClose}
          className="text-sm font-medium cursor-pointer bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
        >
          Got it
        </button>
      </motion.div>
    </div>
  );
};

export default InfoModal;
