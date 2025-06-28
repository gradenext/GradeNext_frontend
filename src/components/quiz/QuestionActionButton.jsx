import { useState } from "react";
import useStore from "../../store/store";
import { Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

const QuestionActionButton = ({ showHint }) => {
  const userAnswer = useStore((state) => state.userAnswer);
  const [showHintTooltip, setShowHintTooltip] = useState(false);
  const { clearUserAnswer, submitAnswer, setUsedHints } = useStore();
  const onClearSelection = () => clearUserAnswer();
  const handleSubmitAnswer = () => {
    submitAnswer();
  };
  return (
    <motion.div
      className="mt-2 sm:mt-3 flex flex-wrap justify-center gap-2 sm:gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <button
        onMouseEnter={() => setShowHintTooltip(true)}
        onMouseLeave={() => setShowHintTooltip(false)}
        onClick={() => {
          showHint.current = true;
          setUsedHints();
        }}
        className="relative bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-full h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center cursor-pointer"
      >
        <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5" />
        {showHintTooltip && (
          <div className="absolute w-32 sm:w-40 right-1/2 translate-x-[50%] bottom-[120%] bg-yellow-100 border border-yellow-300 text-yellow-800 text-xs sm:text-sm font-medium p-1 sm:p-2 rounded-md z-50">
            Click to show hint
          </div>
        )}
      </button>
      <button
        disabled={!userAnswer}
        onClick={onClearSelection}
        className={`text-purple-600 hover:text-purple-800 bg-purple-100 rounded-full px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base transition-colors ${
          userAnswer ? "" : "cursor-not-allowed opacity-50"
        }`}
      >
        Clear Response
      </button>
      <button
        disabled={!userAnswer}
        onClick={handleSubmitAnswer}
        className={`text-purple-100 min-w-28 sm:min-w-36 hover:text-purple-200 bg-purple-700 sm:bg-purple-900 rounded-full px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base transition-colors ${
          userAnswer ? "cursor-pointer" : "cursor-not-allowed opacity-50"
        }`}
      >
        Submit Answer
      </button>
    </motion.div>
  );
};

export default QuestionActionButton;
