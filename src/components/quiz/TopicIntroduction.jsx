import React, { useState, useEffect, useRef } from "react";
import { Minimize2, Maximize2, Loader } from "lucide-react";
import errorRobot from "../../assets/error-robot.svg";
import { getTopicIntroduction } from "../../services/quiz";
import useStore from "../../store/store";

const TopicIntroduction = ({ topicName }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isMinimized, setIsMinimized] = useState(false);
	const [loading, setLoading] = useState(false);
	const [topicDetail, setTopicDetail] = useState(null);

	const prevTopicName = useRef(null);
	const prevSubject = useRef(null);
	const selectedSubject = useStore((state) => state?.selectedSubject);

	useEffect(() => {
		const fetchIntro = async () => {
			// Check if either dependency has changed
			if (
				topicName !== prevTopicName.current ||
				selectedSubject !== prevSubject.current
			) {
				try {
					if (topicName) {
						setIsModalOpen(true);
						setLoading(true);

						setTopicDetail(null);

						const data = await getTopicIntroduction(
							selectedSubject
						);
						setTopicDetail(data);
					} else {
						setIsModalOpen(false);
						setIsMinimized(false);
					}
				} catch (err) {
					console.log(err);
				} finally {
					setLoading(false);
				}
			}

			// Update previous values
			prevTopicName.current = topicName;
			prevSubject.current = selectedSubject;
		};

		fetchIntro();
	}, [topicName, selectedSubject]);

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
					<div className="flex flex-row items-center justify-between mb-4 ">
						<h2 className="text-2xl font-bold capitalize">
							Introduction to{" "}
							<span className="capitalize underline">
								{topicName}
							</span>
						</h2>
						<button
							onClick={handleMinimize}
							className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
						>
							<Minimize2 className="h-4 w-4" />
						</button>
					</div>

					<div className=" overflow-y-auto pr-2 flex-1">
						{loading ? (
							<div className="h-full flex items-center justify-center p-8">
								<Loader className="h-24 w-24 animate-spin" />
							</div>
						) : topicDetail ? (
							<div className="space-y-4">
								<p className="">{topicDetail?.introduction}</p>
								<div>
									<h3 className="text-lg font-semibold mb-2">
										Key Points:
									</h3>
									<ul className="list-disc pl-6 space-y-2">
										{topicDetail?.key_concepts?.map(
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
									<div className="space-y-4">
										{topicDetail?.examples?.map(
											(example, index) => (
												<div
													key={index}
													className="bg-gray-50 p-4 rounded-lg border border-gray-200"
												>
													<div className="font-medium">
														{example}
													</div>
												</div>
											)
										)}
									</div>
								</div>
							</div>
						) : (
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
						)}
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
					className="bg-black text-white rounded-full px-4 py-2 flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
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
