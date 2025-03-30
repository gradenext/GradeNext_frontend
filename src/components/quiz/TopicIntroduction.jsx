import React, { useState, useEffect, useRef } from "react";
import { Minimize2, Maximize2, Loader } from "lucide-react";
import errorRobot from "../../assets/error-robot.svg";

const TopicIntroduction = ({ topicName, topicDetail, isLoading, error }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isMinimized, setIsMinimized] = useState(false);
	const prevTopicName = useRef(null);

	// Track topic changes to prevent unwanted openings
	useEffect(() => {
		if (topicName && topicName !== prevTopicName.current) {
			setIsModalOpen(true);
			setIsMinimized(false);
		} else if (!topicName) {
			setIsModalOpen(false);
			setIsMinimized(false);
		}

		prevTopicName.current = topicName;
	}, [topicName]);

	const handleMinimize = () => {
		setIsModalOpen(false);
		setIsMinimized(true);
	};

	const handleMaximize = () => {
		setIsModalOpen(true);
		setIsMinimized(false);
	};

	return (
		<>
			{/* Main Modal Backdrop */}
			<div
				className={`fixed inset-0 bg-black/50 z-50 flex items-center justify-center transition-opacity duration-300 ${
					isModalOpen
						? "opacity-100"
						: "opacity-0 pointer-events-none"
				}`}
				onClick={handleMinimize}
			>
				<div
					className="bg-white rounded-lg p-6 max-w-[80%] w-full h-[80vh] flex flex-col"
					onClick={(e) => e.stopPropagation()}
				>
					<div className="flex flex-row items-center justify-between mb-4">
						<h2 className="text-2xl font-bold capitalize">
							Introduction to{" "}
							<span className="capitalize underline">
								{topicName}
							</span>
						</h2>
						<button
							onClick={handleMinimize}
							className="p-2 rounded-full hover:bg-gray-100 transition-colors"
						>
							<Minimize2 className="h-4 w-4" />
						</button>
					</div>

					<div className=" overflow-y-auto pr-2 flex-1">
						{isLoading ? (
							<div className="h-full flex items-center justify-center p-8">
								<Loader className="h-24 w-24 animate-spin" />
							</div>
						) : error ? (
							<div className="h-full w-full bg-red-50 border-2 border-red-200 p-4 rounded-lg text-center flex justify-center items-center">
								<div className=" mx-auto">
									<img
										src={errorRobot}
										alt="Confused robot"
										className="w-64 h-64 mx-auto animate-bounce"
									/>
									<h3 className="text-black font-bold text-xl mt-4">
										Oops! Something went wrong 😢
									</h3>
									{/* <p className="text-blue-500 mt-2 text-lg">
										{error} 
									</p> */}
									<p className="text-black mt-2">
										Don't worry, our robot friends are
										working on it!
									</p>
								</div>
							</div>
						) : topicDetail ? (
							<div className="space-y-4">
								<p className="text-lg">
									{topicDetail.description}
								</p>
								<div>
									<h3 className="text-lg font-semibold mb-2">
										Key Points:
									</h3>
									<ul className="list-disc pl-6 space-y-2">
										{topicDetail.keyPoints.map(
											(point, index) => (
												<li key={index}>{point}</li>
											)
										)}
									</ul>
								</div>
								<div>
									<h3 className="text-lg font-semibold mb-2">
										Examples:
									</h3>
									<div className="space-y-2">
										{topicDetail.examples.map(
											(example, index) => (
												<div
													key={index}
													className="bg-gray-50 p-3 rounded-md"
												>
													{example}
												</div>
											)
										)}
									</div>
								</div>
							</div>
						) : null}
					</div>
				</div>
			</div>

			{/* Minimized Button */}
			<div
				className={`fixed bottom-4 right-4 z-50 transition-opacity duration-300 ${
					isMinimized
						? "opacity-100"
						: "opacity-0 pointer-events-none"
				}`}
			>
				<button
					onClick={handleMaximize}
					className="bg-black text-white rounded-full px-4 py-2 flex items-center gap-2 shadow-lg transition-colors"
				>
					<Maximize2 className="h-4 w-4" />
					<span>
						Show{" "}
						<span className="capitalize underline">
							{topicName}
						</span>{" "}
						Introduction
					</span>
				</button>
			</div>
		</>
	);
};

export default TopicIntroduction;
