import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import useStore from "../../store/store";
import { QuestionFooter } from "./QuizFooter";
import Timer from "./Timer";
import Caclulator from "./Calculator";
import QuestionText from "./QuestionText";
import QuestionAnswer from "./QuestionAnswer";
import QuestionActionButton from "./QuestionActionButton";

export const QuestionCard = () => {
  const showHint = useRef(false);

  const question = useStore((state) => state.quizQuestion);
  const userAnswer = useStore((state) => state.userAnswer);
  const correctAnswer = useStore((state) => state.correctAnswer);
  const showExplanation = useStore((state) => state.showExplanation);
  const isNextQuestionLoading = useStore(
    (state) => state.isNextQuestionLoading
  );
  const setQuestionLoadedAt = useStore((state) => state.setQuestionLoadedAt);

  // Track when the question is actually mounted/rendered
  const questionMountedRef = useRef(null);

  useEffect(() => {
    if (question) {
      const now = new Date();
      questionMountedRef.current = now;
      setQuestionLoadedAt(now);
    }
  }, [question, setQuestionLoadedAt]);

  const { moveToNext } = useStore();

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
        <div className="w-full px-4 py-3 bg-[#FFF8F0] rounded-2xl shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          {/* Left: Timer + Level */}
          <div className="flex items-center gap-3 justify-center sm:justify-start w-full sm:w-auto">
            <Timer />

            <div className="bg-[#FF8AAE] text-white text-xs sm:text-sm px-3 py-1 rounded-full shadow font-bold uppercase">
              {question?.current_level?.split("_").join(" ")}
            </div>
          </div>

          {/* Center: Topic */}
          <div className="text-center w-full sm:w-auto">
            <div className="text-base sm:text-xl font-extrabold italic bg-gradient-to-r from-[#FF7F50] via-[#FFD700] to-[#40E0D0] bg-clip-text text-transparent tracking-wide truncate px-1">
              {question?.current_topic?.split("_").join(" ")}
            </div>
          </div>

          {/* Right: Calculator Icon */}
          <div className="flex justify-center sm:justify-end w-full sm:w-auto">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#C2F2D0] flex items-center justify-center shadow-md border border-green-300">
              <Caclulator className="w-5 h-5 text-green-700" />
            </div>
          </div>
        </div>

        {/* Main content area with flexible height */}
        <div className="flex flex-col gap-3 sm:gap-4 flex-1">
          {/* Question section */}
          <QuestionText question={question} />

          {/* Options grid or Input bar */}
          <QuestionAnswer />

          {/* Action Buttons */}
          {!showExplanation && <QuestionActionButton showHint={showHint} />}

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
