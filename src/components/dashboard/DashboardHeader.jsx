import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Rocket,
  LifeBuoy,
  BookOpen,
  ChevronDown,
  List,
  Ellipsis,
} from "lucide-react";
import LogoutModal from "../modals/LogoutModal";
import RaiseTicketModal from "../modals/RaiseTicketModal";
import BookTutorModal from "../modals/BookTutorModal";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showRaiseTicket, setShowRaiseTicket] = useState(false);
  const [showBookTutorModal, setShowBookTutorModal] = useState(false);

  const ACTION_BUTTONS = [
    {
      label: "Book Tutor",
      onClick: () => setShowBookTutorModal(true),
      icon: <BookOpen className="w-4 h-4 text-white animate-bounce" />,
      gradient: "from-green-400 to-emerald-500",
    },
    {
      label: "Raise a Ticket",
      onClick: () => setShowRaiseTicket(true),
      icon: <LifeBuoy className="w-4 h-4 text-white animate-bounce" />,
      gradient: "from-yellow-400 to-orange-400",
    },
    {
      label: "Log Out!",
      onClick: () => setShowLogoutModal(true),
      icon: <Rocket className="w-4 h-4 text-white animate-bounce" />,
      gradient: "from-red-500 to-pink-500",
    },
  ];

  return (
    <motion.div className="fixed top-0 w-full z-50 bg-gradient-to-r from-sky-100 via-indigo-100 to-purple-100">
      {/* 💻 Message Strip */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60, damping: 10 }}
        className=" px-4 py-2 flex justify-center items-center gap-2"
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
          className="text-base font-semibold text-center bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-600 bg-clip-text text-transparent"
        >
          We're actively improving this platform — exciting updates coming soon!
        </motion.h2>

        <motion.span
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-xl"
        >
          🚀
        </motion.span>
      </motion.div>

      {/* Navbar */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60, damping: 10 }}
        className="w-full border-b border-blue-200 shadow px-6 py-1 "
      >
        <div className="flex flex-row items-center justify-between w-full gap-4">
          {/* Avatar Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/user/profile")}
            className="flex cursor-pointer items-center gap-2 px-4 py-2 rounded-xl shadow-md bg-gradient-to-r from-sky-400 to-blue-400 text-white focus:outline-none"
          >
            <img
              src="https://api.dicebear.com/9.x/adventurer/svg?seed=Nolan"
              alt="Avatar"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <span className="hidden sm:inline font-medium">Profile</span>
          </motion.button>

          {/* Actions Dropdown */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex items-center cursor-pointer gap-2 px-4 py-2 rounded-xl shadow-md bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm sm:text-base focus:outline-none"
            >
              <Ellipsis /> Actions
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </motion.button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  key="dropdown"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="right-0 transform absolute mx-auto mt-2 min-w-[11rem] bg-white rounded-xl shadow-xl z-50 p-2 space-y-2 ring-1 ring-gray-200"
                >
                  {ACTION_BUTTONS.map((btn, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        btn.onClick();
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm shadow bg-gradient-to-r ${btn.gradient}`}
                    >
                      {btn.icon}
                      <span>{btn.label}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Logout Modal */}
      <LogoutModal
        onClose={() => setShowLogoutModal(false)}
        isOpen={showLogoutModal}
      />
      <RaiseTicketModal
        onClose={() => setShowRaiseTicket(false)}
        isOpen={showRaiseTicket}
      />
      <BookTutorModal isOpen={showBookTutorModal} onClose={() => setShowBookTutorModal(false)} />
    </motion.div>
  );
};

export default DashboardHeader;
