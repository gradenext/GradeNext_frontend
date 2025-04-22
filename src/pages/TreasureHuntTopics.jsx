import React, { useEffect, useState } from "react";
import useStore from "../store/store";
import { getSubjectTopicList } from "../services/quiz";
import { motion, AnimatePresence } from "framer-motion";
import {
	MoveRight,
	BookOpen,
	Rocket,
	Sparkles,
	LayoutDashboard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const colors = {
	primary: "#6C63FF", // Purple
	secondary: "#FF9F4A", // Orange
	accent: "#4ACBFF", // Blue
	success: "#6DD400", // Green
	background: "#FFF8F0", // Warm white
};

const TreasureHuntTopics = () => {
	const selectedSubject = useStore((state) => state.selectedSubject);
	const setSelectedTopic = useStore((state) => state.setSelectedTopic);
	const session_id = useStore((state) => state.session_id);
	const generateQuestion = useStore((state) => state.generateQuestion);
	const navigate = useNavigate();
	const [topics, setTopics] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchTopics = async () => {
			try {
				setLoading(true);
				const topicList = await getSubjectTopicList(selectedSubject);
				setTopics(topicList);
			} catch (error) {
				console.error("Error fetching topics:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchTopics();
	}, [selectedSubject]);

	const handleContinue = async (topic) => {
		if (!topic) return;
		setSelectedTopic(topic);
		try {
			setLoading(true);
			await generateQuestion();
			navigate(
				`/treasurehunt/${session_id}/${selectedSubject}/${topic?.topic_key}`
			);
		} catch (error) {
			console.log("Error Occurred", error);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="flex flex-col items-center justify-center min-h-screen"
				style={{ background: colors.background }}
			>
				<motion.div
					animate={{
						rotate: 360,
						scale: [1, 1.2, 1],
					}}
					transition={{
						repeat: Infinity,
						duration: 1.5,
						ease: "linear",
					}}
					className="mb-6"
				>
					<Rocket
						className="w-16 h-16"
						style={{ color: colors.primary }}
					/>
				</motion.div>
				<motion.h2
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.3 }}
					className="text-2xl font-bold"
					style={{
						color: colors.primary,
						fontFamily: "'Bubblegum Sans', cursive",
					}}
				>
					Preparing Your Learning Adventure...
				</motion.h2>
			</motion.div>
		);
	}

	return (
		<motion.div
			className="mx-auto py-6 px-12"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			style={{ fontFamily: "'Bubblegum Sans', cursive" }}
		>
			{/* Header Section with Dashboard Button */}
			<div className="flex justify-between items-start mb-8">
				<motion.div
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.5 }}
					className="text-center"
				>
					<motion.div
						animate={{ rotate: [0, 15, -15, 0] }}
						transition={{ repeat: Infinity, duration: 4 }}
						className="inline-block mb-4"
					>
						<BookOpen
							className="w-12 h-12"
							style={{ color: colors.primary }}
						/>
					</motion.div>
					<h2
						className="text-3xl sm:text-4xl font-bold mb-2"
						style={{
							background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
						}}
					>
						Treasure Hunt Topics
					</h2>
					<p className="text-lg sm:text-xl text-gray-700">
						Choose your learning adventure!
					</p>
					<div
						className="h-1 w-20 mx-auto rounded-full mt-3"
						style={{ background: colors.accent }}
					></div>
				</motion.div>

				{/* Move to Dashboard Button */}
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={() => navigate("/dashboard")}
					className="px-4 py-2 rounded-lg text-white shadow-md flex items-center gap-2 cursor-pointer"
					style={{
						backgroundColor: colors.secondary,
						fontFamily: "'Bubblegum Sans', cursive",
					}}
				>
					<LayoutDashboard className="w-5 h-5" />
					<span className="hidden sm:inline">Dashboard</span>
				</motion.button>
			</div>

			{/* Topics List */}
			<motion.div
				className="space-y-4"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.3 }}
			>
				<AnimatePresence>
					{topics.map((topic, index) => (
						<motion.div
							key={topic?.topic_key}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 + index * 0.05 }}
							whileHover={{
								scale: 1.02,
								boxShadow: `0 10px 25px -5px ${colors.primary}20`,
							}}
							whileTap={{ scale: 0.98 }}
							className="bg-white p-5 rounded-2xl shadow-lg border flex flex-col sm:flex-row items-center justify-between"
							style={{
								borderColor: `${colors.primary}20`,
								background: `linear-gradient(to right, ${colors.background} 0%, white 50%)`,
							}}
						>
							<div className="flex items-center gap-4 mb-4 sm:mb-0">
								<motion.div
									whileHover={{ scale: 1.1 }}
									className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold shadow-md"
									style={{
										backgroundColor: colors.primary,
										fontFamily: "'Bubblegum Sans', cursive",
									}}
								>
									{index + 1}
								</motion.div>
								<div>
									<h3
										className="text-xl font-bold"
										style={{ color: colors.primary }}
									>
										{topic.topic_name}
									</h3>
									<p className="text-gray-600 text-sm">
										{topic.description ||
											"Explore this exciting topic!"}
									</p>
								</div>
							</div>

							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => handleContinue(topic)}
								className="px-6 py-3 rounded-full text-white shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer"
								style={{
									background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
									minWidth: "160px",
								}}
							>
								Start Learning
								<motion.div
									animate={{ x: [0, 5, 0] }}
									transition={{
										repeat: Infinity,
										duration: 1.5,
									}}
								>
									<MoveRight className="w-5 h-5" />
								</motion.div>
							</motion.button>
						</motion.div>
					))}
				</AnimatePresence>
			</motion.div>

			{/* Empty State */}
			{topics.length === 0 && !loading && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="text-center py-10"
				>
					<div className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center bg-purple-100">
						<BookOpen
							className="w-12 h-12"
							style={{ color: colors.primary }}
						/>
					</div>
					<h3
						className="text-xl font-bold mb-2"
						style={{ color: colors.primary }}
					>
						No Topics Available Yet
					</h3>
					<p className="text-gray-600">
						We're preparing exciting content for you!
					</p>
				</motion.div>
			)}
		</motion.div>
	);
};

export default TreasureHuntTopics;
