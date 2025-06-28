import { useState } from "react";
import useStore from "../../store/store";
import Latex from "react-latex";
import { motion, AnimatePresence } from "framer-motion";

const QuestionAnswer = () => {
  const [hoverOption, setHoverOption] = useState(null);

  const question = useStore((state) => state.quizQuestion);
  const userAnswer = useStore((state) => state.userAnswer);
  const correctAnswer = useStore((state) => state.correctAnswer);
  const showExplanation = useStore((state) => state.showExplanation);

  const { setUserAnswer } = useStore();

  const onSelectAnswer = (value) => setUserAnswer(value);

  if (question?.question_type === "multiple")
    return (
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
                  <Latex>{option}</Latex>
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
    );
  else if (question?.question_type === "input")
    return (
      <div className="flex flex-col items-center">
        <input
          type="text"
          value={userAnswer || ""}
          onChange={(e) => {
            e.stopPropagation();
            onSelectAnswer(e.target.value);
          }}
          disabled={showExplanation}
          className="w-full p-3 sm:p-4 text-base sm:text-lg rounded-lg sm:rounded-xl border border-purple-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 text-purple-800 font-medium transition-all"
          placeholder="Type your answer..."
        />
        {showExplanation && (
          <AnimatePresence mode="wait">
            {correctAnswer && (
              <motion.div
                key={userAnswer === correctAnswer ? "correct" : "incorrect"}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="mt-2 text-sm sm:text-base"
              >
                {userAnswer === correctAnswer ? (
                  <span className="text-green-700 font-bold">Correct ✅</span>
                ) : (
                  <span className="text-red-700 font-bold">
                    Incorrect ❌ (Correct:{" "}
                    <span className="underline">{correctAnswer}</span>)
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    );
  else return <div>Hello</div>;
};

export default QuestionAnswer;
