import { X } from "lucide-react";
import React, { useRef, useEffect } from "react";

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  closeOnOutsideClick = true,
  allowClose = true,
}) => {
  const modalRef = useRef(null);

  // Close modal when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        allowClose &&
        closeOnOutsideClick &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose, closeOnOutsideClick]);

  return (
    <div
      className={`fixed inset-0 z-50 h-screen w-screen bg-black/80 flex items-center justify-center transition-opacity duration-300 p-4 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-lg shadow-xl w-full max-w-md mx-2 sm:mx-4 transition-all duration-300 ${
          isOpen ? "scale-100" : "scale-95"
        }`}
      >
        {title && (
          <div className="flex justify-between items-center p-3 sm:p-4 border-b">
            <h3 className="text-base sm:text-lg font-medium capitalize">
              {title}
            </h3>
            {allowClose && (
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer p-1"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}
        <div className="p-4 sm:p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
