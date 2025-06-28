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
        <div className="h-14 sm:h-16 w-full flex justify-between items-center mb-2 sm:mb-4">
          <Timer className="w-6 h-6" />
          <div className="text-lg sm:text-xl bg-blue-500 capitalize bg-clip-text text-transparent font-bold text-center overflow-hidden px-1 sm:px-2 truncate">
            {question?.progress?.current_topic?.split("_").join(" ")}
          </div>
          <Caclulator className="w-5 h-5 sm:w-6 sm:h-6" />
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
