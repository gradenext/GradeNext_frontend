import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut } from "lucide-react";
import useStore from "../../store/store";
import Modal from "../Modal";

const LogoutModal = ({ onClose, isOpen }) => {
  const { logout } = useStore();
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={"Confirm Log Out"}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative z-10 rounded-xl shadow-2xl mx-auto p-6 space-y-4"
      >
        <div className="flex  items-center gap-2">
          <LogOut className="w-5 h-5 text-red-500" />
          <h3 className="text-lg font-semibold">Confirm Logout</h3>
        </div>
        <p className="text-sm text-gray-600">
          Are you sure you want to log out?
        </p>
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-md border cursor-pointer font-medium hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => logout()}
            className="px-4 py-1.5 cursor-pointer rounded-md bg-red-500 text-white  font-medium hover:bg-red-600"
          >
            Yes, Logout
          </button>
        </div>
      </motion.div>
    </Modal>
  );
};

export default LogoutModal;
