import React, { useState } from "react";
import { Lightbulb, Loader, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import useStore from "../../store/store";

export const QuestionCard = () => {
	const [hoverOption, setHoverOption] = useState(null);
	const [showTooltip, setShowTooltip] = useState(false);
	const [showExplanation, setShowExplantion] = useState(false);

	const question = useStore((state) => state.quizQuestion);
	const selectedAnswer = useStore((state) => state.userAnswer);
	const isCorrect = useStore((state) => state.isCorrect);
	const loading = useStore((state) => state.loading);

	const { setUserAnswer, clearUserAnswer, setIsCorrect, submitAnswer } =
		useStore();

	const onSelectAnswer = (value) => setUserAnswer(value);
	const onClearSelection = () => clearUserAnswer();
	const handleSubmitAnswer = () => submitAnswer();

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

	if (loading) {
		return (
			<motion.div
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				<div className="p-6 rounded-3xl border-4 border-blue-300 bg-white shadow-lg">
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
			transition={{ duration: 0.5 }}
		>
			<div className="p-6 rounded-3xl border-4 border-blue-300 bg-white shadow-lg relative overflow-hidden">
				<div className="absolute -right-8 -top-8 w-16 h-16 bg-yellow-200 rounded-full opacity-30"></div>
				<div className="absolute -left-8 -bottom-8 w-16 h-16 bg-purple-200 rounded-full opacity-30"></div>

				<div className="relative">
					<motion.h2
						className="text-xl mb-6 pr-10 font-bold text-purple-800 bg-gradient-to-r from-purple-100 to-blue-100 p-4 rounded-xl border-2 border-purple-200"
						dangerouslySetInnerHTML={{
							__html: question?.question,
						}}
						initial={{ scale: 0.95 }}
						animate={{ scale: 1 }}
						transition={{ duration: 0.5 }}
					/>

					<div className="">
						<button
							onMouseEnter={() => setShowTooltip(true)}
							onMouseLeave={() => setShowTooltip(false)}
							className="absolute z-20 top-2 right-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-full h-10 w-10 flex items-center justify-center"
						>
							<Lightbulb className="h-5 w-5" />
						</button>

						{showTooltip && (
							<div className="absolute right-0 top-12 bg-yellow-100 border-2 border-yellow-300 text-yellow-800 font-medium p-2 rounded-lg z-10">
								Correct Answer: {question.correctAnswer}
							</div>
						)}
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
					<AnimatePresence>
						{Object.values(question.options).map((option, index) => {
							const buttonClasses =
								"p-4 text-lg w-full rounded-xl font-medium border-2 transition-all relative";
							let bgColor = "bg-white";
							let borderColor = "border-gray-200";
							let textColor = "text-gray-700";

							if (showExplanation) {
								if (option === question.correctAnswer) {
									bgColor = "bg-green-100";
									borderColor = "border-green-400";
									textColor = "text-green-700";
								} else if (option === selectedAnswer) {
									bgColor = "bg-red-100";
									borderColor = "border-red-400";
									textColor = "text-red-700";
								}
							} else if (selectedAnswer === option) {
								bgColor = "bg-blue-100";
								borderColor = "border-blue-400";
								textColor = "text-blue-700";
							} else if (hoverOption === option) {
								bgColor = "bg-purple-50";
								borderColor = "border-purple-300";
							}

							const fullClasses = `${buttonClasses} ${bgColor} ${borderColor} ${textColor}`;

							return (
								<motion.button
									key={option}
									onClick={() => {
										onSelectAnswer(option);
										isCorrect && triggerCorrectConfetti();
										setIsCorrect();
									}}
									disabled={showExplanation}
									className={fullClasses}
									onMouseEnter={() => setHoverOption(option)}
									onMouseLeave={() => setHoverOption(null)}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.3,
										delay: index * 0.1,
									}}
									whileHover={{
										scale: showExplanation ? 1 : 1.03,
										boxShadow: showExplanation
											? "none"
											: "0 4px 12px rgba(0,0,0,0.1)",
									}}
								>
									<div className="flex items-center">
										<div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center text-white font-bold mr-3 flex-shrink-0">
											{String.fromCharCode(65 + index)}
										</div>
										<span
											dangerouslySetInnerHTML={{
												__html: option,
											}}
										/>
									</div>

									{showExplanation && isCorrect && (
										<motion.div
											className="absolute right-3 text-2xl"
											initial={{ scale: 0 }}
											animate={{ scale: 1 }}
											transition={{
												type: "spring",
												stiffness: 300,
												damping: 10,
											}}
										>
											✅
										</motion.div>
									)}

									{showExplanation &&
										isCorrect &&
										option === selectedAnswer && (
											<motion.div
												className="absolute right-3 text-2xl"
												initial={{ scale: 0 }}
												animate={{ scale: 1 }}
												transition={{
													type: "spring",
													stiffness: 300,
													damping: 10,
												}}
											>
												❌
											</motion.div>
										)}
								</motion.button>
							);
						})}
					</AnimatePresence>
				</div>

				{!showExplanation && (
					<motion.div
						className="mt-4 flex justify-end gap-x-4"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
					>
						<button
							disabled={!selectedAnswer}
							onClick={onClearSelection}
							className={`text-purple-600 hover:text-purple-800 bg-purple-100 rounded-full px-4 py-2 transition-colors ${
								selectedAnswer
									? "cursor-pointer"
									: "cursor-not-allowed"
							}`}
						>
							Clear Response
						</button>
						<button
							disabled={!selectedAnswer}
							onClick={handleSubmitAnswer}
							className={`text-purple-100 min-w-36 hover:text-purple-200 bg-purple-900 rounded-full px-4 py-2 transition-colors ${
								selectedAnswer
									? "cursor-pointer"
									: "cursor-not-allowed"
							}`}
						>
							Submit Answer
						</button>
					</motion.div>
				)}
			</div>
		</motion.div>
	);
};
