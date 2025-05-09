import React, { useEffect, useRef, useState } from "react";
import { Lightbulb, Speaker, SpeakerIcon, Speech } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import useStore from "../../store/store";
import { QuestionFooter } from "./QuizFooter";
import Timer from "./Timer";
import Caclulator from "./Calculator";

export const QuestionCard = () => {
  const [hoverOption, setHoverOption] = useState(null);
  const [showHintTooltip, setShowHintTooltip] = useState(false);
  const showHint = useRef(false);

  const question = useStore((state) => state.quizQuestion);
  const userAnswer = useStore((state) => state.userAnswer);
  const correctAnswer = useStore((state) => state.correctAnswer);
  const showExplanation = useStore((state) => state.showExplanation);
  const isNextQuestionLoading = useStore(
    (state) => state.isNextQuestionLoading
  );
  const setQuestionLoadedAt = useStore((state) => state.setQuestionLoadedAt);

  const speakText = () => {
    const utterance = new SpeechSynthesisUtterance(question?.question);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  // Track when the question is actually mounted/rendered
  const questionMountedRef = useRef(null);

  useEffect(() => {
    if (question) {
      const now = new Date();
      questionMountedRef.current = now;
      setQuestionLoadedAt(now);
    }
  }, [question, setQuestionLoadedAt]);

  const {
    setUserAnswer,
    clearUserAnswer,
    submitAnswer,
    moveToNext,
    setUsedHints,
  } = useStore();

  const onSelectAnswer = (value) => setUserAnswer(value);
  const onClearSelection = () => clearUserAnswer();
  const handleSubmitAnswer = () => {
    submitAnswer();
  };

  useEffect(() => {
    userAnswer &&
      correctAnswer &&
      userAnswer === correctAnswer &&
      triggerCorrectConfetti();
  }, [userAnswer, correctAnswer]);

  const triggerCorrectConfetti = () => {
    const count = 100;
    const defaults = { origin: { y: 0.7 }, zIndex: 5000 };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      origin: { x: 0.2, y: 0.7 },
    });
    fire(0.2, { spread: 60, origin: { x: 0.5, y: 0.7 } });
  };

  if (isNextQuestionLoading) {
    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className=""
      >
        <div className="min-h-[90vh] p-6 rounded-3xl border-4 border-blue-300 bg-white shadow-lg flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center py-10">
            <div className="animate-bounce mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white animate-ping"></div>
              </div>
            </div>
            <p className="text-lg font-bold text-purple-600">
              Loading your question...
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!question) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="min-h-[70dvh] p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-blue-300 bg-white shadow-md sm:shadow-lg relative overflow-hidden flex flex-col">
        {/* Decorative elements */}
        <div className="absolute -right-6 -top-6 w-12 h-12 sm:w-16 sm:h-16 bg-yellow-200 rounded-full opacity-30"></div>
        <div className="absolute -left-6 -bottom-6 w-12 h-12 sm:w-16 sm:h-16 bg-purple-200 rounded-full opacity-30"></div>

        {/* Header with timer and topic */}
        <div className="h-14 sm:h-16 w-full flex justify-between items-center mb-2 sm:mb-4">
          <Timer className="w-6 h-6" />
          <div className="text-lg sm:text-xl bg-blue-500 capitalize bg-clip-text text-transparent font-bold text-center overflow-hidden px-1 sm:px-2 truncate">
            {question?.progress?.current_topic?.split("_").join(" ")}
          </div>
          <Caclulator className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>

        {/* Main content area with flexible height */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {/* Question section */}
          <motion.div
            className="flex-1 min-h-[20vh] max-h-[30vh] overflow-y-auto text-lg sm:text-xl font-bold text-purple-800 bg-gradient-to-r from-purple-50 to-blue-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-purple-100 sm:border-2 sm:border-purple-200"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {question?.question}
          </motion.div>

          {/* Options grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
            <AnimatePresence>
              {question?.options?.map((option, index) => {
                const buttonClasses =
                  "p-3 sm:p-4 text-base sm:text-lg w-full rounded-lg sm:rounded-xl font-medium border transition-all relative";
                let bgColor = "bg-white";
                let borderColor = "border-gray-200";
                let textColor = "text-gray-700";

                if (showExplanation) {
                  if (option === correctAnswer) {
                    bgColor = "bg-green-50";
                    borderColor = "border-green-300";
                    textColor = "text-green-700";
                  } else if (option === userAnswer) {
                    bgColor = "bg-red-50";
                    borderColor = "border-red-300";
                    textColor = "text-red-700";
                  }
                } else if (userAnswer === option) {
                  bgColor = "bg-blue-50";
                  borderColor = "border-blue-300";
                  textColor = "text-blue-700";
                } else if (hoverOption === option) {
                  bgColor = "bg-purple-50";
                  borderColor = "border-purple-200";
                }

                const fullClasses = `${buttonClasses} ${bgColor} ${borderColor} ${textColor}`;

                return (
                  <motion.button
                    key={index}
                    onClick={() => onSelectAnswer(option)}
                    disabled={showExplanation}
                    className={`${fullClasses} cursor-pointer`}
                    onMouseEnter={() => setHoverOption(option)}
                    onMouseLeave={() => setHoverOption(null)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    whileHover={{
                      scale: showExplanation ? 1 : 1.02,
                      boxShadow: showExplanation
                        ? "none"
                        : "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                  >
                    <div className="flex items-center">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center text-white font-bold mr-2 sm:mr-3 flex-shrink-0 text-xs sm:text-sm">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span dangerouslySetInnerHTML={{ __html: option }} />
                    </div>

                    {showExplanation && correctAnswer && (
                      <motion.div
                        className="absolute right-2 sm:right-3 text-xl sm:text-2xl"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 10,
                        }}
                      >
                        {option === correctAnswer ? "✅" : "❌"}
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Action Buttons */}
          {!showExplanation && (
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
                  userAnswer
                    ? "cursor-pointer"
                    : "cursor-not-allowed opacity-50"
                }`}
              >
                Submit Answer
              </button>
            </motion.div>
          )}

          {/* Hint and Explanation */}
          <QuestionFooter
            showHint={showHint?.current}
            showExplanation={showExplanation}
            onContinue={() => {
              showHint.current = false;
              moveToNext();
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};
