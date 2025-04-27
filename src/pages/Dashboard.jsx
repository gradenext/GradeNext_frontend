import { motion, AnimatePresence } from "framer-motion";
import {
	BookOpen,
	Calculator,
	Languages,
	Trophy,
	Clock,
	ListChecks,
	Rocket,
	Sparkles,
	Gem,
	Puzzle,
	User,
} from "lucide-react";
import useStore from "../store/store";
import { useNavigate } from "react-router-dom";
import Timer from "../components/quiz/Timer";

const Dashboard = () => {
	const navigate = useNavigate();

	const session_id = useStore((state) => state.session_id);
	const selectedMode = useStore((state) => state.selectedMode);
	const selectedSubject = useStore((state) => state.selectedSubject);
	const overallStats = useStore((state) => state.user_stats.overall);
	const loading = useStore((state) => state.loading);

	const { logout, setSelectedSubject, setSelectedMode, generateQuestion } =
		useStore();

	// Color palette designed for kids
	const colors = {
		primary: "#6C63FF", // Purple
		secondary: "#FF9F4A", // Orange
		accent: "#4ACBFF", // Blue
		success: "#6DD400", // Green
		background: "#FFF8F0", // Warm white
	};

	const subjects = [
		{
			id: "mathematics",
			label: "Math Adventure",
			icon: <Calculator className="w-12 h-12" />,
			color: colors.primary,
			emoji: "🧮✨",
		},
		{
			id: "english",
			label: "Word Kingdom",
			icon: <Languages className="w-12 h-12" />,
			color: colors.accent,
			emoji: "📚🌈",
		},
	];

	const actions = [
		{
			id: "practice",
			label: "Practice Quest",
			icon: <Puzzle className="w-10 h-10" />,
			color: colors.secondary,
			emoji: "🕹️",
		},
		{
			id: "revision",
			label: "Time Travel",
			icon: <Clock className="w-10 h-10" />,
			color: colors.success,
			emoji: "⏳🌀",
		},
		{
			id: "topic",
			label: "Treasure Hunt",
			icon: <Gem className="w-10 h-10" />,
			color: colors.primary,
			emoji: "🏴‍☠️💎",
		},
	];

	const handleStart = async () => {
		if (!selectedSubject || !selectedMode) return;

		if (selectedMode === "topic") {
			navigate(`/treasurehunt/topics/${selectedSubject}`);
			return;
		}
		try {
			await generateQuestion();
			navigate(`/${selectedMode}/${session_id}`);
		} catch (error) {
			console.log("Error Occured", error);
		}
	};
	const stats = [
		{
			label: "📋 Total Questions",
			value: overallStats?.total,
		},
		{
			label: "✅ Correct",
			value: overallStats.correct,
			progress:
				(overallStats.correct / overallStats?.total).toFixed(2) * 100,
		},
		{
			label: "❌ Incorrect",
			value: overallStats.incorrect,
			progress:
				(overallStats.incorrect / overallStats?.total).toFixed(2) * 100,
		},
		{
			label: "🎯 Accuracy",
			value: `${
				(overallStats.correct / overallStats?.total).toFixed(2) * 100
			}%`,
			progress:
				(overallStats.correct / overallStats?.total).toFixed(2) * 100,
		},
	];

	const handleLogout = () => logout();

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 relative">
			{/* Floating Logout Button */}
			<motion.button
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				className="fixed top-6 left-6 z-50 flex items-center space-x-3 px-4 py-2 rounded-xl shadow-lg transition-all duration-200 cursor-pointer"
				style={{
					background:
						"linear-gradient(135deg, #6bc1ff 0%, #8ed1ff 100%)",
				}}
				onClick={() => navigate("/user/profile")}
			>
				<img
					src="https://api.dicebear.com/9.x/adventurer/svg?seed=Nolan"
					alt="Avatar"
					className="w-8 h-8 rounded-full border-2 border-white"
				/>
			</motion.button>
			<motion.button
				onClick={handleLogout}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				className="fixed top-6 right-6 z-50 flex items-center space-x-2 px-4 py-2 rounded-xl shadow-lg transition-all duration-200 cursor-pointer"
				style={{
					background:
						"linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)",
				}}
			>
				<Sparkles className="w-5 h-5 text-white" />
				<span className="text-white text-lg">Blast Off!</span>
				<Rocket className="w-5 h-5 text-white animate-bounce" />
			</motion.button>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Animated Header */}
				<motion.div
					className="text-center mb-4"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<motion.div
						animate={{ rotate: [0, 15, -15, 0] }}
						transition={{ repeat: Infinity, duration: 4 }}
						className="inline-block mb-4"
					>
						<Rocket className="w-16 h-16 text-purple-600" />
					</motion.div>
					<h1
						className="text-4xl md:text-5xl font-bold pb-2"
						style={{
							background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
						}}
					>
						Learning Wonderland!
					</h1>
					<p className="text-xl text-gray-700">
						Choose your adventure and start learning!
					</p>
				</motion.div>

				{/* Main Content */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Left Column */}
					<div className="lg:col-span-2 space-y-8">
						{/* Subject Selection */}
						<motion.div
							className="space-y-6"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
						>
							<h2
								className="text-2xl font-bold"
								style={{
									color: colors.primary,
								}}
							>
								🎯 Choose Your Subject
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{subjects.map((subject) => (
									<motion.div
										key={subject.id}
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										className={`p-6 rounded-2xl cursor-pointer transition-all ${
											selectedSubject === subject.id
												? "ring-4 shadow-xl"
												: "shadow-lg hover:shadow-xl"
										}`}
										style={{
											backgroundColor:
												selectedSubject === subject.id
													? `${subject.color}20`
													: "white",
											borderColor: subject.color,
										}}
										onClick={() =>
											setSelectedSubject(subject.id)
										}
									>
										<div className="flex items-center gap-4">
											<div
												className="p-3 rounded-xl"
												style={{
													backgroundColor: `${subject.color}20`,
												}}
											>
												{subject.icon}
											</div>
											<div>
												<h3
													className="text-2xl font-bold mb-1"
													style={{
														color: subject.color,
													}}
												>
													{subject.label}
												</h3>
												<p
													className="text-lg"
													style={{
														color: colors.primary,
													}}
												>
													{subject.emoji}
												</p>
											</div>
										</div>
									</motion.div>
								))}
							</div>
						</motion.div>

						{/* Activity Selection */}
						<motion.div
							className="space-y-6"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.2 }}
						>
							<h2
								className="text-2xl font-bold"
								style={{
									color: colors.secondary,
								}}
							>
								🎮 Learning Activities
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								{actions.map((action) => (
									<motion.div
										key={action.id}
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className={`p-6 rounded-2xl cursor-pointer transition-all ${
											selectedMode === action.id
												? "ring-4 shadow-xl"
												: "shadow-lg hover:shadow-xl"
										}`}
										style={{
											backgroundColor:
												selectedMode === action.id
													? `${action.color}20`
													: "white",
											borderColor: action.color,
										}}
										onClick={() =>
											setSelectedMode(action.id)
										}
									>
										<div className="flex flex-col items-center gap-3">
											<div
												className="p-3 rounded-xl"
												style={{
													backgroundColor: `${action.color}20`,
												}}
											>
												{action.icon}
											</div>
											<h3
												className="text-xl font-bold text-center"
												style={{ color: action.color }}
											>
												{action.label}
											</h3>
											<p className="text-lg">
												{action.emoji}
											</p>
										</div>
									</motion.div>
								))}
							</div>
						</motion.div>
					</div>

					{/* Right Column */}
					<div className="space-y-2">
						{/* Progress Stats */}
						<motion.div
							className="py-8 px-4 bg-white rounded-2xl shadow-2xl border border-gray-100"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.4 }}
						>
							<h2
								className="text-3xl font-extrabold mb-8 flex items-center gap-2"
								style={{ color: colors.accent }}
							>
								📊 Overall Progress
							</h2>

							<div className="space-y-8">
								{stats.map((stat, index) => {
									const barColor = [
										colors.primary,
										colors.secondary,
										colors.accent,
										colors.success,
									][index % 4];

									if (stat.label === "📋 Total Questions") {
										return (
											<div
												key={index}
												className="flex justify-between items-center border-x-0 border-3 py-2 border-gray-400"
											>
												<span className="text-sm text-gray-500 font-medium uppercase tracking-wide">
													{stat.label}
												</span>
												<span
													className={`font-semibold text-lg`}
													style={{ color: barColor }}
												>
													{stat.value}
												</span>
											</div>
										);
									}

									return (
										<div key={index} className="space-y-2">
											<div className="flex justify-between items-center">
												<span className="text-sm text-gray-500 font-medium uppercase tracking-wide">
													{stat.label}
												</span>
												<span
													className={`font-semibold text-lg`}
													style={{ color: barColor }}
												>
													{stat.value}
												</span>
											</div>
											{
												<div className="h-3 bg-gray-200 rounded-full overflow-hidden relative group">
													<motion.div
														initial={{ width: 0 }}
														animate={{
															width: `${stat.progress}%`,
														}}
														transition={{
															duration: 0.8,
														}}
														className="h-full rounded-full"
														style={{
															backgroundColor:
																barColor,
														}}
													/>
												</div>
											}
										</div>
									);
								})}
							</div>
						</motion.div>

						{/* Start Button */}
						<motion.div
							className="sticky top-8"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.6 }}
						>
							<button
								onClick={handleStart}
								disabled={!selectedSubject || !selectedMode}
								className={`w-full py-5 text-xl font-bold rounded-2xl transition-all 
                  ${
						selectedSubject && selectedMode
							? "hover:scale-105 shadow-xl"
							: "opacity-50 cursor-not-allowed"
					}
                  relative cursor-pointer overflow-hidden`}
								style={{
									backgroundColor: colors.primary,
									color: "white",
								}}
							>
								{loading ? (
									<div className="flex items-center justify-center gap-2">
										<motion.div
											animate={{ rotate: 360 }}
											transition={{
												repeat: Infinity,
												duration: 1,
											}}
										>
											<Sparkles className="w-6 h-6" />
										</motion.div>
										Starting Adventure...
									</div>
								) : (
									<>
										🚀 Let's Learn! 🌟
										<AnimatePresence>
											{selectedSubject &&
												selectedMode && (
													<motion.div
														initial={{ scale: 0 }}
														animate={{ scale: 1 }}
														className="absolute inset-0 bg-white/20"
													/>
												)}
										</AnimatePresence>
									</>
								)}
							</button>
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
