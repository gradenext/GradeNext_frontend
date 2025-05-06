import React from "react";
import useStore from "../../store/store";
import FeedbackDropdown from "./FeedbackDropdown";

const QuizNavbar = () => {
  const grade = useStore((state) => state.user.grade);
  const selectedSubject = useStore((state) => state.selectedSubject);
  const setExitModal = useStore((state) => state.setExitModal);

  return (
    <div className="animate-fadeIn my-2">
      <div className="mb-4 flex flex-col sm:flex-row justify-between bg-white bg-opacity-90 px-2 sm:px-4 py-2 sm:py-3 rounded-2xl items-center shadow-lg border-4 border-yellow-300 gap-2 sm:gap-3">
        {/* Grade & Subject - Top on mobile, left on desktop */}
        <div className="w-full sm:w-auto text-sm md:text-base capitalize bg-blue-500 py-1 px-2 sm:py-2 sm:px-3 rounded-full text-white font-bold shadow-md text-center sm:text-left whitespace-nowrap">
          <span className="uppercase">
            Grade {grade} | {selectedSubject}
          </span>
        </div>

        

        {/* Action Buttons - Bottom on mobile, right on desktop */}
        <div className="w-fit sm:w-auto relative flex items-center justify-center gap-x-1 sm:gap-x-2 flex-wrap gap-y-1 sm:gap-y-2">
          <div className="flex items-center gap-1 sm:gap-2">
            <FeedbackDropdown className="w-5 h-5 sm:w-5 sm:h-5" />
          </div>
          <button
            onClick={() => {
              setExitModal(true, false);
            }}
            className="text-sm capitalize text-blue-500 py-1 px-2 sm:py-2 sm:px-3 rounded-full bg-white hover:bg-slate-200 font-bold shadow-md cursor-pointer transition-all duration-300 border border-blue-500 whitespace-nowrap"
          >
            Exit Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizNavbar;
