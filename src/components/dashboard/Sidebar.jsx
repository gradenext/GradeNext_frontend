import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Settings,
  User,
  BookOpen,
  LifeBuoy,
  Rocket,
  ChevronLeft,
  BarChart2,
  CreditCard,
  Trophy,
} from "lucide-react";

import LogoutModal from "../modals/LogoutModal";
import RaiseTicketModal from "../modals/RaiseTicketModal";
import BookTutorModal from "../modals/BookTutorModal";

export default function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showRaiseTicket, setShowRaiseTicket] = useState(false);
  const [showBookTutorModal, setShowBookTutorModal] = useState(false);

  const BUTTONS = [
    {
      label: "My Profile",
      icon: User,
      onClickHandler: () => navigate("/user/profile"),
      color: "bg-gradient-to-r from-purple-400 to-fuchsia-500 text-white",
    },
    {
      label: "My Progress",
      icon: BarChart2,
      onClickHandler: () => navigate("/user/stats"),
      color: "bg-gradient-to-r from-indigo-400 to-cyan-500 text-white",
    },
    {
      label: "Subscription",
      icon: CreditCard,
      onClickHandler: () => navigate("/user/plan"),
      color: "bg-gradient-to-r from-amber-400 to-yellow-500 text-white",
    },
    {
      label: "Leaderboard",
      icon: Trophy,
      onClickHandler: () => navigate("/user/leaderboard"),
      color: "bg-gradient-to-r from-blue-400 to-sky-500 text-white",
    },
    {
      label: "Raise a Ticket",
      icon: LifeBuoy,
      onClickHandler: () => setShowRaiseTicket(true),
      color: "bg-gradient-to-r from-yellow-400 to-orange-400 text-white",
    },
    {
      label: "Book a Tutor",
      icon: BookOpen,
      onClickHandler: () => setShowBookTutorModal(true),
      color: "bg-gradient-to-r from-green-400 to-emerald-500 text-white",
    },

    {
      label: "Logout",
      icon: Rocket,
      onClickHandler: () => setShowLogoutModal(true),
      color: "bg-gradient-to-r from-red-500 to-pink-500 text-white",
    },
  ];

  return (
    <div>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 backdrop-blur-sm bg-black/10"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: isOpen ? 200 : 56 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className=" fixed top-0 left-0 h-full pt-16 bg-white shadow-xl z-50 flex flex-col"
      >
        {/* Toggle Button */}
        <div className="relative h-12 w-full">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="relative cursor-pointer -translate-x-1/2 p-2 bg-gray-400 rounded-full text-gray-600 hover:text-black"
            animate={{
              x: isOpen ? 200 : 28,
              rotate: isOpen ? 0 : 180,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          >
            <ChevronLeft size={20} />
          </motion.button>
        </div>

        {/* All Buttons */}
        <div className="flex flex-col gap-2 px-2 pb-4 pt-4">
          {BUTTONS.map(({ label, icon: Icon, color, onClickHandler }, idx) => (
            <button
              key={idx}
              onClick={() => {
                onClickHandler();
                setIsOpen(false);
              }}
              className={`flex items-center w-full cursor-pointer px-2 py-2 rounded-lg text-sm shadow-sm ${color}`}
            >
              <Icon size={20} className="min-w-[20px] ml-0.5" />

              <motion.span
                initial={false}
                animate={{
                  width: isOpen ? "auto" : 0,
                  opacity: isOpen ? 1 : 0,
                  marginLeft: isOpen ? 8 : 0,
                }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden whitespace-nowrap"
              >
                {label}
              </motion.span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Modals */}
      <LogoutModal
        onClose={() => setShowLogoutModal(false)}
        isOpen={showLogoutModal}
      />
      <RaiseTicketModal
        onClose={() => setShowRaiseTicket(false)}
        isOpen={showRaiseTicket}
      />
      <BookTutorModal
        onClose={() => setShowBookTutorModal(false)}
        isOpen={showBookTutorModal}
      />
    </div>
  );
}
