import React, { useState } from "react";
import useStore from "../store/store";
import QuizNavbar from "../components/quiz/QuizNavbar";
import { useWindowSize } from "react-use";
import ReactConfetti from "react-confetti";
import TopicIntroduction from "../components/quiz/TopicIntroduction";
import ProgessDashboard from "../components/quiz/ProgressDashboard";
import { QuestionCard } from "../components/quiz/QuestionCard";
import ExitModal from "../components/quiz/ExitModal";

const Quiz = () => {
	const quizQuestion = useStore((state) => state.quizQuestion);

	const { width, height } = useWindowSize();
	const [showConfetti, setShowConfetti] = useState(false);
	return (
		<div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 overflow-hidden relative">
			{showConfetti && (
				<ReactConfetti
					width={width}
					height={height}
					recycle={false}
					numberOfPieces={5000}
				/>
			)}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-20 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-50 animate-float"></div>
				<div className="absolute top-40 right-20 w-16 h-16 bg-green-300 rounded-full opacity-50 animate-float-delay"></div>
				<div className="absolute bottom-20 left-1/4 w-24 h-24 bg-pink-300 rounded-full opacity-50 animate-float-slow"></div>
				<div className="absolute bottom-40 right-1/3 w-12 h-12 bg-blue-300 rounded-full opacity-50 animate-float-delay-slow"></div>
			</div>

			<div className=" mx-auto px-6 relative z-10">
				<QuizNavbar />
				<div className="flex gap-x-2 ">
					<div className=" w-[60%] min-h-[50vh] mx-auto">
						<QuestionCard />
					</div>
					<div className="w-[40%] ">
						<ProgessDashboard />
					</div>
				</div>
			</div>

			<TopicIntroduction
				topicName={quizQuestion?.progress?.current_topic
					?.split("_")
					.join(" ")}
			/>
			<ExitModal />
		</div>
	);
};

export default Quiz;
