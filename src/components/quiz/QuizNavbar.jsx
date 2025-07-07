import React, { useState } from "react";
import useStore from "../../store/store";
import FeedbackDropdown from "./FeedbackDropdown";
import GlossaryModal from "./GlossaryModal";

const QuizNavbar = () => {
  const [showGlossary, setShowGlossary] = useState(false);
  const grade = useStore((state) => state.user.grade);
  const selectedSubject = useStore((state) => state.selectedSubject);
  const setExitModal = useStore((state) => state.setExitModal);
  const selectedMode = useStore((state) => state.selectedMode);
  const selectedTopic = useStore((state) => state.selectedTopic);

  return (
    <>
      <div className="animate-fadeIn my-2">
        <div className="mb-4 flex flex-col sm:flex-row justify-between bg-white bg-opacity-90 px-2 sm:px-4 py-2 sm:py-3 rounded-2xl items-center shadow-lg border-4 border-yellow-300 gap-2 sm:gap-3">
          {/* Grade & Subject */}
          <div className="w-full sm:w-auto text-sm md:text-base capitalize bg-blue-500 py-1 px-2 sm:py-2 sm:px-3 rounded-full text-white font-bold shadow-md text-center sm:text-left whitespace-nowrap">
            <span className="uppercase">
              Grade {grade} | {selectedSubject}
            </span>
          </div>

          {/* Mode / Topic */}
          <div className="sm:w-auto text-4xl bg-blue-500 capitalize bg-clip-text text-transparent font-bold text-center w-full sm:max-w-[50%] px-1">
            {selectedMode === "topic"
              ? selectedTopic?.topic_name
              : selectedMode}
          </div>

          {/* Actions */}
          <div className="w-fit sm:w-auto flex items-center justify-center gap-x-1 sm:gap-x-2 flex-wrap gap-y-1 sm:gap-y-2">
            <FeedbackDropdown className="w-5 h-5 sm:w-5 sm:h-5" />
            <button
              onClick={() => setExitModal(true, false)}
              className="text-sm capitalize text-blue-500 py-1 px-2 sm:py-2 sm:px-3 rounded-full bg-white hover:bg-slate-200 font-bold shadow-md cursor-pointer transition-all duration-300 border border-blue-500"
            >
              Exit Quiz
            </button>
          </div>
        </div>
      </div>

      {/* Floating Glossary Button */}
      <button
        onClick={() => setShowGlossary(true)}
        className="fixed bottom-5 right-5 z-40 bg-yellow-300 hover:bg-yellow-400 text-blue-800 font-bold py-2 px-4 rounded-full shadow-lg border-2 border-yellow-500 transition-all duration-300"
      >
        📚 Glossary
      </button>

      {/* Glossary Modal */}
      {showGlossary && (
        <GlossaryModal
          onClose={() => setShowGlossary(false)}
          currentTopic={selectedTopic?.topic_name || "addition"}
        />
      )}
    </>
  );
};

export default QuizNavbar;
