import React, { useState } from "react";
import Modal from "../Modal";
import useStore from "../../store/store";
import { useNavigate } from "react-router-dom";
import { endSession } from "../../services/auth";
import { Loader } from "lucide-react";

const ExitModal = () => {
  const navigate = useNavigate();
  const exitModal = useStore((state) => state.exitModal);
  const setExitModal = useStore((state) => state.setExitModal);
  const session_id = useStore((state) => state.session_id);
  const setSession = useStore((state) => state.setSession);

  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await endSession(session_id);
      setSession(false);
      setExitModal(false, false);
      navigate(`/report`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={exitModal.showModal}
      onClose={() => setExitModal(false)}
      title={"Exit Quiz"}
    >
      {loading ? (
        <div className="flex justify-center items-center py-10 w-full h-full">
          <Loader className="animate-spin h-8 w-8" />
        </div>
      ) : (
        <div>
          <div className="text-center ">
            Are you sure you want to exit quiz??
          </div>
          <div className="text-center text-red-900 text-xs">
            This action can't be undone
          </div>

          <div className="mt-6 flex justify-end gap-3">
            {!exitModal.timerExpired && (
              <button
                onClick={() => setExitModal(false)}
                className="px-4 py-2 text-sm sm:text-base font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="px-4 py-2 text-sm sm:text-base font-medium text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors cursor-pointer"
            >
              {exitModal.timerExpired ? "See Reports" : "Confirm"}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ExitModal;
