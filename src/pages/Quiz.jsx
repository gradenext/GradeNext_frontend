import React, { useState } from "react";
import useStore from "../store/store";
import QuizNavbar from "../components/quiz/QuizNavbar";
import QuizHeader from "../components/quiz/QuizHeader";
import { useWindowSize } from "react-use";
import ReactConfetti from "react-confetti";
import Caclulator from "../components/quiz/Calculator";
import TopicIntroduction from "../components/quiz/TopicIntroduction";
import ProgessDashboard from "../components/quiz/ProgressDashboard";
import { QuestionCard } from "../components/quiz/QuestionCard";

const topicDetails = {
	title: "Adding, Subtracting, and Understanding Data",
	description:
		"In this topic, we'll learn about adding and subtracting numbers, which are ways to find out how much we have in total or how much is left. We will also explore how to collect, organize, and understand simple data by using charts and graphs.",
	keyPoints: [
		"Adding means putting numbers together to find out how many there are in all.",
		"Subtracting means taking away some numbers to find out how many are left.",
		"Data is information we collect, such as counting the number of apples or the days of sunshine.",
		"We can organize data using charts, like bar graphs, to make it easier to understand.",
		"Understanding data helps us answer questions about the things we count or measure.",
	],
	examples: [
		"If you have 3 apples and get 2 more, you add them together: 3 + 2 = 5 apples.",
		"If you have 5 candies and eat 2, you subtract to find out how many are left: 5 - 2 = 3 candies.",
		"If your class counts how many students bring lunch from home and how many buy lunch at school, you can use a chart to show this data.",
	],
};

const fakeTestReport = {
	totalQuestions: 42,
	correctAnswers: 28,
	hintsUsed: 9,
	averageTimePerQuestion: 34.5,
	bestStreak: 7,
	topicStats: {
		Algebra: {
			correct: 6,
			total: 15,
			hintsUsed: 3,
			totalTime: 420,
		},
		Geometry: {
			correct: 8,
			total: 12,
			hintsUsed: 4,
			totalTime: 560,
		},
		Calculus: {
			correct: 5,
			total: 10,
			hintsUsed: 2,
			totalTime: 720,
		},
		Trigonometry: {
			correct: 3,
			total: 5,
			hintsUsed: 0,
			totalTime: 180,
		},
	},
	questionsData: [
		// Sample questions - you can expand this list
		{
			topic: "Algebra",
			difficulty: "easy",
			correct: true,
			timeSpent: 25,
			hintsUsed: 0,
		},
		{
			topic: "Geometry",
			difficulty: "medium",
			correct: false,
			timeSpent: 45,
			hintsUsed: 1,
		},
		{
			topic: "Calculus",
			difficulty: "hard",
			correct: false,
			timeSpent: 68,
			hintsUsed: 2,
		},
		{
			topic: "Trigonometry",
			difficulty: "easy",
			correct: true,
			timeSpent: 32,
			hintsUsed: 0,
		},
		{
			topic: "Algebra",
			difficulty: "hard",
			correct: false,
			timeSpent: 55,
			hintsUsed: 1,
		},
		// Add more entries following the same pattern...
		// You can generate more entries to reach totalQuestions count
	],
};

// Add more questions to reach totalQuestions count
for (let i = 0; i < 38; i++) {
	// Already added 5 above
	fakeTestReport.questionsData.push({
		topic: ["Algebra", "Geometry", "Calculus", "Trigonometry"][
			Math.floor(Math.random() * 4)
		],
		difficulty: ["easy", "medium", "hard"][Math.floor(Math.random() * 3)],
		correct: Math.random() > 0.3, // 70% correct rate
		timeSpent: Math.floor(Math.random() * 60 + 15),
		hintsUsed: Math.floor(Math.random() * 2),
	});
}

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

			<div className="max-w-7xl mx-auto p-6 relative z-10">
				<QuizNavbar  />
				<div className="flex ">
					<div className=" w-[60%] mx-auto px-4">
						<QuizHeader />
						<QuestionCard isLoading={false} />
					</div>
					<div className="w-[40%]">
						<ProgessDashboard testReport={fakeTestReport} />
					</div>
				</div>
			</div>

			<Caclulator />
			<TopicIntroduction
				topicName={quizQuestion?.progress?.current_topic
					?.split("_")
					.join(" ")}
				topicDetail={topicDetails}
				isLoading={false}
				// error={"topicDetailError"}
			/>
		</div>
	);
};

export default Quiz;
