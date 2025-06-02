import { Maximize2 } from "lucide-react";
import { useState } from "react";
import Modal from "../Modal";

const QuestionImage = ({ imageUrl, alt }) => {
  const [showImageModal, setShowImageModal] = useState(false);

  return (
    <div className="relative flex justify-center mb-3">
      <img
        src={imageUrl}
        alt={alt || "Question"}
        className=" h-36 rounded-lg border border-blue-200 shadow-sm object-contain"
        style={{ background: "#f8fafc" }}
      />
      <button
        onClick={() => setShowImageModal(true)}
        className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full p-1 shadow transition cursor-pointer"
        aria-label="Maximize image"
        type="button"
      >
        <Maximize2 />
      </button>

      {showImageModal && (
        <Modal
          isOpen={showImageModal}
          onClose={() => setShowImageModal(false)}
          title="Question Image"
          closeOnOutsideClick={true}
        >
          <div className="w-full">
            <img
              src={imageUrl}
              alt="Question Fullscreen"
              className="w-full max-h-[70vh] object-contain rounded"
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default QuestionImage;
