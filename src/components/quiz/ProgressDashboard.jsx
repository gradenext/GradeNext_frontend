import { useState } from "react";
import {
	PieChart,
	Pie,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
	Cell,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, Brain, BookOpen } from "lucide-react";
import useStore from "../../store/store";

const COLORS = {
	purple: {
		light: "bg-purple-100",
		dark: "bg-purple-700",
		text: "text-purple-600",
	},
	green: {
		light: "bg-green-100",
		dark: "bg-green-700",
		text: "text-green-600",
	},
	blue: {
		light: "bg-blue-100",
		dark: "bg-blue-700",
		text: "text-blue-600",
	},
	orange: {
		light: "bg-orange-100",
		dark: "bg-orange-700",
		text: "text-orange-600",
	},
};

const fakeTestReport = {
	totalQuestions: 0,
	correctAnswers: 0,
	hintsUsed: 0,
	averageTimePerQuestion: 0,
	bestStreak: 0,
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

function ProgressDashboard() {
	const { session_stats, max_streak } = useStore((state) => state.analytics);
	const hintsUsed = useStore((state) => state.usedHints);
	const avgTimeTaken = useStore((state) => state.avgTimeTaken);

	const testReport = {
		...fakeTestReport,
		totalQuestions: session_stats?.correct + session_stats?.incorrect,
		correctAnswers: session_stats?.correct,
		hintsUsed,
		averageTimePerQuestion: avgTimeTaken,
		bestStreak: max_streak,
	};

	const [activeTab, setActiveTab] = useState("overview");

	// Calculate topic statistics
	const topicStats = Object.entries(testReport.topicStats).map(
		([topic, stats]) => ({
			topic,
			accuracy: (stats.correct / stats.total) * 100 || 0,
			hintsUsed: stats.hintsUsed,
			incorrect: stats.total - stats.correct,
			averageTime: stats.totalTime / stats.total || 0,
		})
	);

	// Calculate revision needed topics
	const revisionMap = testReport.questionsData
		.filter((q) => !q.correct)
		.reduce((acc, q) => {
			const key = `${q.topic}_${q.difficulty}`;
			if (!acc[key]) {
				acc[key] = {
					topic: q.topic,
					difficulty: q.difficulty,
					count: 0,
				};
			}
			acc[key].count++;
			return acc;
		}, {});

	const revisionNeeded = Object.values(revisionMap)
		.filter((entry) => entry.count > 0)
		.map((entry) => ({
			label: `${entry.topic}: ${entry.difficulty.replace("_", " ")}`,
			count: entry.count,
		}));

	// Calculate incorrect counts
	const incorrectCounts = testReport.questionsData.reduce((acc, q) => {
		if (!q.correct) acc[q.topic] = (acc[q.topic] || 0) + 1;
		return acc;
	}, {});

	// Get emoji based on accuracy
	const getAccuracyEmoji = (accuracy) => {
		if (accuracy >= 80) return "🤩";
		if (accuracy >= 60) return "😊";
		if (accuracy >= 40) return "🙂";
		if (accuracy >= 20) return "😐";
		return "🤔";
	};

	// Chart data
	const pieData = [
		{ name: "Correct", value: testReport.correctAnswers, color: "#4ade80" },
		{
			name: "Incorrect",
			value: testReport.totalQuestions - testReport.correctAnswers,
			color: "#fb7185",
		},
	];

	const barData = topicStats.map((topic) => ({
		name: topic.topic.substring(0, 3) + "...",
		accuracy: topic.accuracy,
		hints: topic.hintsUsed,
		topic: topic.topic,
	}));

	// Animation variants
	const tabContentVariants = {
		hidden: { opacity: 0, x: 20, scale: 0.95 },
		visible: {
			opacity: 1,
			x: 0,
			scale: 1,
			transition: {
				duration: 0.4,
				ease: "easeOut",
				staggerChildren: 0.1,
				delayChildren: 0.1,
			},
		},
		exit: {
			opacity: 0,
			x: -20,
			scale: 0.95,
			transition: { duration: 0.3, ease: "easeIn" },
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -10 },
	};

	// Custom tooltip for bar chart
	const CustomBarTooltip = ({ active, payload, label }) => {
		if (active && payload && payload.length) {
			const fullTopicName = barData.find(
				(item) => item.name === label
			)?.topic;
			return (
				<div className="bg-white p-3 rounded-lg shadow-md border border-gray-200">
					<p className="font-bold text-sm text-purple-700">
						{fullTopicName}
					</p>
					<p className="text-sm">
						<span className="text-blue-600">Accuracy:</span>{" "}
						{payload[0].value.toFixed(1)}%
					</p>
					<p className="text-sm">
						<span className="text-yellow-600">Hints Used:</span>{" "}
						{payload[1].value}
					</p>
				</div>
			);
		}
		return null;
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="max-w-4xl mx-auto "
		>
			<div className="p-4 rounded-3xl border-4 border-purple-300 bg-white shadow-xl relative">
				{/* Decorative elements */}
				<div className="absolute -right-8 -top-8 w-16 h-16 bg-yellow-200 rounded-full opacity-50 -z-10"></div>
				<div className="absolute -left-8 -bottom-8 w-16 h-16 bg-blue-200 rounded-full opacity-50 -z-10"></div>

				{/* Header */}
				<h2 className="text-xl font-bold mb-3 text-center bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text flex items-center justify-center">
					<Trophy className="mr-2 h-5 w-5 text-yellow-500" />
					Your Progress Dashboard
				</h2>

				{/* Summary Stats */}
				<motion.div className="grid grid-cols-4 gap-2 mb-4">
					{[
						{
							value: testReport.totalQuestions,
							label: "Questions",
							color: "purple",
						},
						{
							value: testReport.correctAnswers,
							label: "Correct",
							color: "green",
						},
						{
							value: testReport.hintsUsed,
							label: "Hints",
							color: "blue",
						},
						{
							value: Math.round(
								testReport.averageTimePerQuestion
							),
							label: "Avg Time",
							color: "orange",
						},
					].map((stat, i) => (
						<motion.div
							key={i}
							className={`${
								COLORS[stat.color].light
							} p-2 rounded-xl text-center`}
							whileHover={{ scale: 1.05 }}
						>
							<div
								className={`text-lg font-bold ${
									COLORS[stat.color].text
								}`}
							>
								{stat.value}
							</div>
							<div
								className={`text-xs ${COLORS[stat.color].text}`}
							>
								{stat.label}
							</div>
						</motion.div>
					))}
				</motion.div>

				{/* Tab Navigation */}
				<div className="w-full">
					<div className="flex gap-2 mb-4 bg-purple-100 p-1 rounded-lg">
						{[
							{
								value: "overview",
								icon: Star,
								label: "Overview",
							},
							{ value: "topics", icon: Brain, label: "Topics" },
							{
								value: "practice",
								icon: BookOpen,
								label: "Practice",
							},
						].map((tab) => (
							<button
								key={tab.value}
								onClick={() => setActiveTab(tab.value)}
								className={`flex-1 flex items-center justify-center p-2 rounded-md transition-colors ${
									activeTab === tab.value
										? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
										: "hover:bg-purple-200"
								}`}
							>
								<tab.icon className="h-4 w-4 mr-1" />
								{tab.label}
							</button>
						))}
					</div>

					{/* Tab Content */}
					<div className="relative " style={{ minHeight: "360px" }}>
						<AnimatePresence mode="wait">
							{/* Overview Tab */}
							{activeTab === "overview" && (
								<motion.div
									key="overview"
									variants={tabContentVariants}
									initial="hidden"
									animate="visible"
									exit="exit"
									className="absolute w-full"
								>
									<div className="flex gap-2 mb-4">
										{/* Pie Chart */}
										<div className="w-1/2 bg-gradient-to-r from-green-50 to-blue-50 p-2 rounded-xl flex flex-col justify-between">
											<h3 className="text-sm font-bold text-blue-700 mb-1">
												Your Brain Power
											</h3>
											<div className="flex justify-center items-center">
												<div className="w-[200px] h-[140px]">
													<ResponsiveContainer
														width="100%"
														height="100%"
													>
														<PieChart>
															<Pie
																data={pieData}
																dataKey="value"
																innerRadius={20}
																outerRadius={40}
																paddingAngle={2}
																cornerRadius={4}
																labelLine={
																	false
																}
															>
																{pieData.map(
																	(
																		entry,
																		index
																	) => (
																		<Cell
																			key={`cell-${index}`}
																			fill={
																				entry.color
																			}
																		/>
																	)
																)}
															</Pie>
															<Tooltip />
															<Legend
																wrapperStyle={{
																	paddingTop:
																		"10px",
																}}
																formatter={(
																	value
																) => (
																	<span className="text-xs text-gray-700">
																		{value}
																	</span>
																)}
															/>
														</PieChart>
													</ResponsiveContainer>
												</div>
												<motion.div
													className="text-4xl ml-2"
													initial={{
														scale: 0.5,
														opacity: 0,
													}}
													animate={{
														scale: 1,
														opacity: 1,
													}}
													transition={{
														delay: 0.3,
														duration: 0.5,
														type: "spring",
													}}
												>
													{getAccuracyEmoji(
														(testReport.correctAnswers /
															testReport.totalQuestions) *
															100
													)}
												</motion.div>
											</div>
										</div>

										{/* Bar Chart */}
										<div className="w-1/2 bg-gradient-to-r from-blue-50 to-purple-50 p-2 rounded-xl">
											<h3 className="text-sm font-bold text-purple-700 mb-1">
												Topic Performance
											</h3>
											<div className="w-full h-[150px]">
												<ResponsiveContainer
													width="100%"
													height="100%"
												>
													<BarChart data={barData}>
														<XAxis
															dataKey="name"
															tick={{
																fontSize: 8,
																fill: "#6b46c1",
															}}
														/>
														<YAxis />
														<Tooltip
															content={
																<CustomBarTooltip />
															}
														/>
														<Legend
															wrapperStyle={{
																paddingTop:
																	"10px",
															}}
															formatter={(
																value
															) => (
																<span className="text-xs text-purple-700">
																	{value}
																</span>
															)}
														/>
														<Bar
															dataKey="accuracy"
															fill="#8b5cf6"
															name="Accuracy (%)"
															radius={[
																4, 4, 0, 0,
															]}
														/>
														<Bar
															dataKey="hints"
															fill="#f59e0b"
															name="Hints Used"
															radius={[
																4, 4, 0, 0,
															]}
														/>
													</BarChart>
												</ResponsiveContainer>
											</div>
										</div>
									</div>

									{/* Achievements */}
									<div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-xl">
										<h3 className="text-sm font-bold text-orange-700 mb-2">
											Your Achievements
										</h3>
										<div className="space-y-2">
											<motion.div
												className="flex items-center bg-white p-2 rounded-lg"
												variants={itemVariants}
											>
												<div className="text-xl mr-2">
													🏆
												</div>
												<div>
													<div className="text-sm font-medium">
														Best Streak
													</div>
													<div className="text-xs text-gray-500">
														{testReport.bestStreak ||
															0}{" "}
														correct answers in a
														row!
													</div>
												</div>
											</motion.div>
											<motion.div
												className="flex items-center bg-white p-2 rounded-lg"
												variants={itemVariants}
											>
												<div className="text-xl mr-2">
													⚡
												</div>
												<div>
													<div className="text-sm font-medium">
														Strongest Topic
													</div>
													<div className="text-xs text-gray-500">
														{Math.min(
															...testReport.questionsData.map(
																(q) =>
																	q.timeSpent
															)
														) || 0}{" "}
														seconds
													</div>
												</div>
											</motion.div>
										</div>
									</div>
								</motion.div>
							)}

							{/* Topics Tab */}
							{activeTab === "topics" && (
								<motion.div
									key="topics"
									variants={tabContentVariants}
									initial="hidden"
									animate="visible"
									exit="exit"
									className="absolute w-full"
								>
									<div className="space-y-2 h-[360px] overflow-y-auto pr-1">
										{topicStats.map((topic, index) => (
											<motion.div
												key={index}
												className="p-3 bg-white rounded-xl shadow-sm border-2 border-indigo-200"
												variants={itemVariants}
												whileHover={{
													scale: 1.02,
													backgroundColor: "#f5f3ff",
												}}
											>
												<h4 className="font-bold text-indigo-700 text-xs flex items-center mb-2">
													<span className="text-lg mr-1">
														{topic.accuracy >= 70
															? "🌟"
															: topic.accuracy >=
															  40
															? "⭐"
															: "✨"}
													</span>
													{topic.topic}
												</h4>
												<div className="grid grid-cols-2 gap-2">
													<div className="flex justify-between items-center bg-indigo-50 p-1.5 rounded-lg text-xs">
														<span className="text-gray-700">
															Accuracy:
														</span>
														<span
															className={`font-bold ${
																topic.accuracy >=
																70
																	? "text-green-600"
																	: topic.accuracy >=
																	  40
																	? "text-yellow-600"
																	: "text-red-600"
															}`}
														>
															{topic.accuracy.toFixed(
																1
															)}
															%
														</span>
													</div>
													<div className="flex justify-between items-center bg-yellow-50 p-1.5 rounded-lg text-xs">
														<span className="text-gray-700">
															Hints:
														</span>
														<span className="font-bold text-yellow-600">
															{topic.hintsUsed}
														</span>
													</div>
													<div className="flex justify-between items-center bg-red-50 p-1.5 rounded-lg text-xs">
														<span className="text-gray-700">
															To Practice:
														</span>
														<span className="font-bold text-red-600">
															{incorrectCounts[
																topic.topic
															] || 0}
														</span>
													</div>
													<div className="flex justify-between items-center bg-blue-50 p-1.5 rounded-lg text-xs">
														<span className="text-gray-700">
															Avg Time:
														</span>
														<span className="font-bold text-blue-600">
															{Math.round(
																topic.averageTime
															)}
															s
														</span>
													</div>
												</div>
											</motion.div>
										))}
									</div>
								</motion.div>
							)}

							{/* Practice Tab */}
							{activeTab === "practice" && (
								<motion.div
									key="practice"
									variants={tabContentVariants}
									initial="hidden"
									animate="visible"
									exit="exit"
									className="absolute w-full"
								>
									<motion.div
										className="bg-gradient-to-r from-pink-50 to-red-50 p-3 rounded-xl"
										variants={itemVariants}
									>
										<h3 className="text-sm font-bold text-pink-700 mb-2 flex items-center">
											<BookOpen className="mr-1 h-4 w-4 text-pink-500" />
											Practice Makes Perfect
										</h3>
										{revisionNeeded.length > 0 ? (
											<div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
												{revisionNeeded.map(
													(item, i) => (
														<motion.div
															key={i}
															className="bg-white p-2 rounded-lg flex items-center"
															variants={
																itemVariants
															}
															whileHover={{
																scale: 1.02,
																backgroundColor:
																	"#fce7f3",
															}}
														>
															<span className="text-lg mr-2">
																📚
															</span>
															<span className="text-pink-700 font-medium text-sm">
																{item.label}
															</span>
															<span className="ml-auto bg-pink-100 text-pink-800 px-2 py-0.5 rounded-full text-xs font-bold">
																{item.count}
															</span>
														</motion.div>
													)
												)}
											</div>
										) : (
											<motion.div
												className="bg-white p-3 rounded-lg text-center"
												variants={itemVariants}
											>
												<p className="text-green-600 font-bold flex items-center justify-center text-sm">
													<span className="text-xl mr-1">
														🎉
													</span>
													Great job! You're doing
													awesome!
												</p>
											</motion.div>
										)}
									</motion.div>

									{/* Quick Tips */}
									<motion.div
										className="mt-3 bg-gradient-to-r from-blue-50 to-green-50 p-3 rounded-xl"
										variants={itemVariants}
									>
										<h3 className="text-sm font-bold text-green-700 mb-2">
											Quick Tips
										</h3>
										<div className="bg-white p-2 rounded-lg">
											<ul className="text-xs space-y-1 text-gray-700">
												<motion.li
													className="flex items-start"
													variants={itemVariants}
												>
													<span className="text-green-500 mr-1">
														✓
													</span>
													Practice topics with lower
													accuracy first
												</motion.li>
												<motion.li
													className="flex items-start"
													variants={itemVariants}
												>
													<span className="text-green-500 mr-1">
														✓
													</span>
													Try to beat your best streak
													of{" "}
													{testReport.bestStreak || 0}
												</motion.li>
												<motion.li
													className="flex items-start"
													variants={itemVariants}
												>
													<span className="text-green-500 mr-1">
														✓
													</span>
													Use hints only when you
													really need them
												</motion.li>
											</ul>
										</div>
									</motion.div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>
			</div>
		</motion.div>
	);
}

export default ProgressDashboard;
