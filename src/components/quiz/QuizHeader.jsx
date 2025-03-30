import React from "react";
import { motion } from "framer-motion";
import useStore from "../../store/store";
import LevelProgress from "./LevelProgess";
import Timer from "./Timer";
import StreakDisplay from "./StreakDisplay";

const QuizHeader = () => {
	const quizQuestion = useStore((state) => state.quizQuestion);

	return (
		<motion.div
			className="mb-4 bg-white p-6 text-black rounded-3xl shadow-lg border-4 border-yellow-300"
			initial={{ y: -20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			{/* Topic and Level Details */}
			<div className="flex justify-between items-center mb-4">
				<Timer />
				<div className="text-xl capitalize font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
					{/* {config.displayNames[currentTopic]} (Level:{" "}
							{difficultyLevel + 1}) */}
					{quizQuestion?.progress?.current_topic
						?.split("_")
						.join(" ")}{" "}
					(Level:
					{quizQuestion?.progress?.current_level
						?.split("_")
						.join(" ")}
					)
				</div>
			</div>

			<LevelProgress
				questionsInCurrentLevel={5} //question attempted
				correctInCurrentLevel={2} // question correct
			/>
			<div className="flex justify-between items-center mt-2">
				<div className="text-sm font-medium text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
					Questions: {5}/5 | Correct: {2}
				</div>
				<StreakDisplay
					currentStreak={quizQuestion?.progress?.current_streak}
					bestStreak={quizQuestion?.progress?.max_streak}
				/>
			</div>
		</motion.div>
	);
};

export default QuizHeader;
