import React from "react";
import Modal from "./Modal";

const CheckoutModal = ({ isOpen, onClose, title, selectedPlan, selectedCycle, handleCheckout }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      className="fixed z-50 inset-0 flex items-center justify-center"
    >
      <div className="">
        <p className="text-gray-700 mb-2">{selectedPlan?.description}</p>

        <div className="mb-4">
          <span className="text-lg font-semibold text-indigo-800">
            Price: ${(selectedPlan?.amount / 100).toFixed(2)} / {selectedCycle}
          </span>
        </div>

        <div className="text-sm text-red-600 mb-4">
          A one-time platform fee of <strong>$25</strong> will be applied.
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md cursor-pointer text-gray-700 bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleCheckout}
            className="px-4 py-2 rounded-md cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white "
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CheckoutModal;
