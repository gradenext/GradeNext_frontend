import React from "react";
import { Loader2 } from "lucide-react";
import Modal from "../Modal";

const CheckoutModal = ({
  isOpen,
  onClose,
  title,
  selectedPlan,
  selectedCycle,
  handleCheckout,
  platformFee,
  loading,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      className="fixed z-50 inset-0 flex items-center justify-center"
      allowClose={!loading}
    >
      <div className="">
        <p className="text-gray-700 mb-2">{selectedPlan?.description}</p>

        <div className="mb-4">
          <span className="text-lg font-semibold text-indigo-800">
            Price: ${(selectedPlan?.amount / 100).toFixed(2)} / {selectedCycle}
          </span>
        </div>

        {platformFee && (
          <div className="text-sm text-red-600 mb-2">
            A one-time platform fee of <strong>$25</strong> will be applied.
          </div>
        )}

        <div className="text-sm text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
          <strong>Note:</strong> Auto-pay will be set up for this subscription.
          The amount will be automatically deducted {selectedCycle}.
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded-md cursor-pointer text-gray-700 bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            onClick={handleCheckout}
            className="px-4 py-2 rounded-md flex justify-center items-center gap-x-3 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {loading && <Loader2 className=" animate-spin h-4 w-4" />}
            Continue to Payment
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CheckoutModal;
