import { useState } from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	Cell,
	CartesianGrid,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import {
	BarChart2,
	CheckCircle,
	FileText,
	Target,
	XCircle,
	BookOpen,
	Ruler,
	Shapes,
	Calculator,
	Landmark,
	FlaskConical,
	BookOpenText,
} from "lucide-react";
import useStore from "../../store/store";

function Accuracy(correct, total) {
	return total > 0 ? ((correct / total) * 100).toFixed(1) + "%" : "0%";
}

function StatCard({ label, value, color, icon }) {
	return (
		<motion.div
			whileHover={{ y: -5 }}
			className="p-4 rounded-xl shadow-md"
			style={{
				backgroundColor: `${color}10`,
				borderLeft: `4px solid ${color}`,
			}}
		>
			<div className="flex items-center space-x-3">
				<div
					className="p-2 rounded-full"
					style={{ backgroundColor: `${color}20`, color }}
				>
					{icon}
				</div>
				<div>
					<div className="text-lg font-semibold" style={{ color }}>
						{label}
					</div>
					<div
						className="text-3xl font-bold"
						style={{ color: colors.primary }}
					>
						{value}
					</div>
				</div>
			</div>
		</motion.div>
	);
}

function TopicCard({ topic, correct, incorrect, total, icon }) {
	return (
		<motion.div
			whileHover={{ scale: 1.02 }}
			className="p-4 rounded-lg shadow-sm border mb-4"
			style={{ borderColor: `${colors.primary}20` }}
		>
			<div className="flex items-center mb-3">
				<div
					className="p-2 rounded-full mr-3"
					style={{
						backgroundColor: `${colors.primary}20`,
						color: colors.primary,
					}}
				>
					{icon}
				</div>
				<h4
					className="text-lg font-bold"
					style={{ color: colors.primary }}
				>
					{topic}
				</h4>
			</div>

			<div className="grid grid-cols-2 gap-3">
				<div className="flex items-center">
					<CheckCircle
						className="w-5 h-5 mr-2"
						style={{ color: colors.success }}
					/>
					<div>
						<div className="text-sm text-gray-600">Correct</div>
						<div
							className="text-xl font-bold"
							style={{ color: colors.success }}
						>
							{correct}
						</div>
					</div>
				</div>
				<div className="flex items-center">
					<XCircle
						className="w-5 h-5 mr-2"
						style={{ color: "#f87171" }}
					/>
					<div>
						<div className="text-sm text-gray-600">Incorrect</div>
						<div
							className="text-xl font-bold"
							style={{ color: "#f87171" }}
						>
							{incorrect}
						</div>
					</div>
				</div>
				<div className="flex items-center">
					<Target
						className="w-5 h-5 mr-2"
						style={{ color: colors.accent }}
					/>
					<div>
						<div className="text-sm text-gray-600">Accuracy</div>
						<div
							className="text-xl font-bold"
							style={{ color: colors.accent }}
						>
							{Accuracy(correct, total)}
						</div>
					</div>
				</div>
				<div className="flex items-center">
					<FileText
						className="w-5 h-5 mr-2"
						style={{ color: colors.primary }}
					/>
					<div>
						<div className="text-sm text-gray-600">Total</div>
						<div
							className="text-xl font-bold"
							style={{ color: colors.primary }}
						>
							{total}
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
}

const subjectIcons = {
	mathematics: <Calculator className="w-6 h-6" />,
	science: <FlaskConical className="w-6 h-6" />,
	history: <Landmark className="w-6 h-6" />,
	english: <BookOpenText className="w-6 h-6" />,
};

const topicIcons = {
	"Adding, Subtracting, and Working with Data": (
		<Calculator className="w-5 h-5" />
	),
	"Adding and Subtracting within 100": <Calculator className="w-5 h-5" />,
	"Measuring Length": <Ruler className="w-5 h-5" />,
	"Addition and Subtraction on the Number Line": (
		<Calculator className="w-5 h-5" />
	),
	"Numbers to 1,000": <Calculator className="w-5 h-5" />,
	"Geometry, Time, and Money": <Shapes className="w-5 h-5" />,
	"Adding and Subtracting within 1,000": <Calculator className="w-5 h-5" />,
	"Equal Groups": <Shapes className="w-5 h-5" />,
	"Putting It All Together": <BookOpen className="w-5 h-5" />,
};

const colors = {
	primary: "#6C63FF", // Purple
	secondary: "#FF9F4A", // Orange
	accent: "#4ACBFF", // Blue
	success: "#6DD400", // Green
	background: "#FFF8F0", // Warm white
};

const CustomTooltip = ({ active, payload, label }) => {
	if (active && payload && payload.length) {
		return (
			<div
				className="bg-white p-3 rounded-lg shadow-lg border"
				style={{
					borderColor: colors.primary,
					fontFamily: "'Bubblegum Sans', cursive",
				}}
			>
				<p className="font-bold" style={{ color: colors.primary }}>
					{label}
				</p>
				<p style={{ color: colors.success }}>
					Correct:{" "}
					<span className="font-bold">{payload[0].value}</span>
				</p>
				<p style={{ color: "#f87171" }}>
					Incorrect:{" "}
					<span className="font-bold">{payload[1].value}</span>
				</p>
			</div>
		);
	}
	return null;
};

export default function Stats() {
	const [activeTab, setActiveTab] = useState("overall");
	const user_stats = useStore((state) => state.user_stats);
	const overall = user_stats?.overall || {
		total: 0,
		correct: 0,
		incorrect: 0,
	};
	const subjects = user_stats?.subjects || {};

	// Set first subject as active if overall doesn't exist
	if (
		!user_stats?.overall &&
		Object.keys(subjects).length > 0 &&
		activeTab === "overall"
	) {
		setActiveTab(Object.keys(subjects)[0]);
	}

	return (
		<div
			className="p-4 sm:p-6 max-w-6xl mx-auto"
			style={{
				fontFamily: "'Bubblegum Sans', cursive",
				backgroundColor: colors.background,
			}}
		>
			{/* Title Section */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="text-center mb-6 sm:mb-8"
			>
				<h2
					className="text-3xl sm:text-4xl font-bold mb-2"
					style={{
						background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
						WebkitBackgroundClip: "text",
						WebkitTextFillColor: "transparent",
						textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
					}}
				>
					My Learning Journey
				</h2>
				<p className="text-lg sm:text-xl text-gray-700 mb-3">
					See how much you've learned!
				</p>
				<div
					className="h-2 w-24 mx-auto rounded-full"
					style={{ background: colors.accent }}
				></div>
			</motion.div>

			{/* Tabs Navigation */}
			<div className="flex overflow-x-auto mb-4 sm:mb-6 pb-2 scrollbar-hide">
				<div
					className="flex space-x-2 border-b"
					style={{ borderColor: `${colors.primary}20` }}
				>
					{/* Overall Tab - Always Visible */}
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className={`px-4 sm:px-6 py-2 sm:py-3 text-base font-medium rounded-t-lg transition-all flex items-center ${
							activeTab === "overall"
								? "text-white shadow-lg"
								: "text-gray-700 hover:bg-gray-100"
						}`}
						style={{
							backgroundColor:
								activeTab === "overall"
									? colors.primary
									: "transparent",
							minWidth: "100px",
						}}
						onClick={() => setActiveTab("overall")}
					>
						<BarChart2 className="w-5 h-5 mr-2" />
						<span>Overall</span>
					</motion.button>

					{/* Subject Tabs */}
					{Object.keys(subjects).map((subjectName) => (
						<motion.button
							key={subjectName}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className={`px-4 sm:px-6 py-2 sm:py-3 text-base font-medium rounded-t-lg transition-all flex items-center ${
								activeTab === subjectName
									? "text-white shadow-lg"
									: "text-gray-700 hover:bg-gray-100"
							}`}
							style={{
								backgroundColor:
									activeTab === subjectName
										? colors.primary
										: "transparent",
								minWidth: "120px",
							}}
							onClick={() => setActiveTab(subjectName)}
						>
							<span className="mr-2">
								{subjectIcons[subjectName] || (
									<BookOpen className="w-5 h-5" />
								)}
							</span>
							<span className="capitalize">{subjectName}</span>
						</motion.button>
					))}
				</div>
			</div>

			{/* Tab Content */}
			<AnimatePresence mode="wait">
				<motion.div
					key={activeTab}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.2 }}
					className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border"
					style={{
						borderColor: `${colors.primary}20`,
						boxShadow: "0 4px 20px rgba(108, 99, 255, 0.1)",
					}}
				>
					{activeTab === "overall" ? (
						<>
							<h3
								className="text-2xl font-bold mb-4 flex items-center"
								style={{ color: colors.primary }}
							>
								<BarChart2 className="w-6 h-6 mr-2" />
								My Overall Progress
							</h3>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
								<StatCard
									label="Correct Answers"
									value={overall.correct}
									color={colors.success}
									icon={<CheckCircle className="w-6 h-6" />}
								/>
								<StatCard
									label="Incorrect Answers"
									value={overall.incorrect}
									color="#f87171"
									icon={<XCircle className="w-6 h-6" />}
								/>
								<StatCard
									label="Accuracy"
									value={Accuracy(
										overall.correct,
										overall.total
									)}
									color={colors.accent}
									icon={<Target className="w-6 h-6" />}
								/>
							</div>

							<h4
								className="text-xl font-semibold mb-4"
								style={{ color: colors.secondary }}
							>
								Subject Performance Chart
							</h4>

							<div className="space-y-6 ">
								{/* Overall Performance Graph */}
								<div>
									<h4
										className="text-xl font-semibold mb-2"
										style={{ color: colors.primary }}
									>
										Overall Performance
									</h4>
									<div className="h-64 bg-gray-50 rounded-lg p-4">
										<ResponsiveContainer
											width="100%"
											height="100%"
										>
											<BarChart
												data={[
													{
														name: "Correct",
														value: overall.correct,
														fill: colors.success,
													},
													{
														name: "Incorrect",
														value: overall.incorrect,
														fill: "#f87171",
													},
												]}
												layout="vertical" // Vertical layout for better readability
											>
												<YAxis
													type="category"
													dataKey="name"
													tick={{
														fontSize: 14,
														fontWeight: "bold",
													}}
													width={80}
												/>
												<XAxis
													type="number"
													tick={{
														fontSize: 12,
														fontWeight: "bold",
													}}
												/>
												<Bar
													dataKey="value"
													fill={colors.success}
													radius={[0, 4, 4, 0]}
													animationDuration={1500}
												/>
											</BarChart>
										</ResponsiveContainer>
									</div>
								</div>

								{/* Subject-wise Performance Graph */}
								<div>
									<h4
										className="text-xl font-semibold mb-2"
										style={{ color: colors.secondary }}
									>
										Subject Performance
									</h4>
									<div className="h-[28rem] bg-gray-50 rounded-lg p-4 pb-12">
										{" "}
										{/* Increased padding-bottom */}
										<ResponsiveContainer
											width="100%"
											height="100%"
										>
											<BarChart
												data={Object.entries(
													subjects
												).map(([name, data]) => ({
													name:
														name
															.charAt(0)
															.toUpperCase() +
														name.slice(1),
													correct: data.correct,
													incorrect: data.incorrect,
												}))}
												margin={{
													top: 20,
													right: 30,
													left: 20,
													bottom: Math.max(
														Object.keys(subjects)
															.length * 5,
														60
													), // Minimum 60px bottom margin
												}}
											>
												<XAxis
													dataKey="name"
													tick={{
														fontSize: 12,
														fontWeight: "bold",
														fill: colors.primary,
													}}
													angle={-45} // Increased angle for better fit
													textAnchor="end"
													height={Math.max(
														Object.keys(subjects)
															.length * 10,
														60
													)} // Minimum height
													interval={0} // Force show all labels
												/>
												<YAxis
													tick={{
														fontSize: 12,
														fontWeight: "bold",
													}}
													width={40} // Give Y-axis labels more space
												/>
												<CartesianGrid
													strokeDasharray="3 3"
													opacity={0.2}
												/>
												<Tooltip
													content={<CustomTooltip />}
													wrapperStyle={{
														minWidth: "220px",
														fontFamily:
															"'Bubblegum Sans', cursive",
														zIndex: 1000,
														pointerEvents: "auto", // Ensure tooltip doesn't block labels
													}}
												/>
												<Bar
													dataKey="correct"
													fill={colors.success}
													radius={[4, 4, 0, 0]}
													name="Correct Answers"
												/>
												<Bar
													dataKey="incorrect"
													fill="#f87171"
													radius={[4, 4, 0, 0]}
													name="Incorrect Answers"
												/>
											</BarChart>
										</ResponsiveContainer>
									</div>
								</div>
							</div>

							<h4
								className="text-xl font-semibold mb-4"
								style={{ color: colors.primary }}
							>
								Subject Details
							</h4>

							<div className="space-y-4">
								{Object.entries(subjects).map(
									([subjectName, subjectData]) => (
										<div
											key={subjectName}
											className="border rounded-lg p-4"
											style={{
												borderColor: `${colors.primary}20`,
											}}
										>
											<div className="flex items-center mb-3">
												<div
													className="p-2 rounded-full mr-3"
													style={{
														backgroundColor: `${colors.primary}20`,
														color: colors.primary,
													}}
												>
													{subjectIcons[
														subjectName
													] || (
														<BookOpen className="w-5 h-5" />
													)}
												</div>
												<h5
													className="text-lg font-bold"
													style={{
														color: colors.primary,
													}}
												>
													{subjectName
														.charAt(0)
														.toUpperCase() +
														subjectName.slice(1)}
												</h5>
											</div>

											<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
												<div className="flex items-center">
													<CheckCircle
														className="w-5 h-5 mr-2"
														style={{
															color: colors.success,
														}}
													/>
													<div>
														<div className="text-sm text-gray-600">
															Correct
														</div>
														<div
															className="text-lg font-bold"
															style={{
																color: colors.success,
															}}
														>
															{
																subjectData.correct
															}
														</div>
													</div>
												</div>
												<div className="flex items-center">
													<XCircle
														className="w-5 h-5 mr-2"
														style={{
															color: "#f87171",
														}}
													/>
													<div>
														<div className="text-sm text-gray-600">
															Incorrect
														</div>
														<div
															className="text-lg font-bold"
															style={{
																color: "#f87171",
															}}
														>
															{
																subjectData.incorrect
															}
														</div>
													</div>
												</div>
												<div className="flex items-center">
													<Target
														className="w-5 h-5 mr-2"
														style={{
															color: colors.accent,
														}}
													/>
													<div>
														<div className="text-sm text-gray-600">
															Accuracy
														</div>
														<div
															className="text-lg font-bold"
															style={{
																color: colors.accent,
															}}
														>
															{Accuracy(
																subjectData.correct,
																subjectData.total
															)}
														</div>
													</div>
												</div>
												<div className="flex items-center">
													<FileText
														className="w-5 h-5 mr-2"
														style={{
															color: colors.primary,
														}}
													/>
													<div>
														<div className="text-sm text-gray-600">
															Total
														</div>
														<div
															className="text-lg font-bold"
															style={{
																color: colors.primary,
															}}
														>
															{subjectData.total}
														</div>
													</div>
												</div>
											</div>
										</div>
									)
								)}
							</div>
						</>
					) : (
						<>
							<h3
								className="text-2xl font-bold mb-4 flex items-center"
								style={{ color: colors.secondary }}
							>
								<span className="mr-2">
									{subjectIcons[activeTab] || (
										<BookOpen className="w-6 h-6" />
									)}
								</span>
								My{" "}
								{activeTab.charAt(0).toUpperCase() +
									activeTab.slice(1)}{" "}
								Progress
							</h3>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
								<StatCard
									label="Total Questions"
									value={subjects[activeTab].total}
									color={colors.primary}
									icon={<FileText className="w-6 h-6" />}
								/>
								<StatCard
									label="Correct Answers"
									value={subjects[activeTab].correct}
									color={colors.success}
									icon={<CheckCircle className="w-6 h-6" />}
								/>
								<StatCard
									label="Accuracy"
									value={Accuracy(
										subjects[activeTab].correct,
										subjects[activeTab].total
									)}
									color={colors.accent}
									icon={<Target className="w-6 h-6" />}
								/>
							</div>

							<h4
								className="text-xl font-semibold mb-4"
								style={{ color: colors.primary }}
							>
								Topic Performance Chart
							</h4>

							<div className="h-[30rem] bg-gray-50 rounded-lg p-4 mb-6">
								{" "}
								{/* Increased height */}
								<ResponsiveContainer width="100%" height="100%">
									<BarChart
										data={subjects[activeTab].topics.map(
											(topic) => ({
												name: topic.topic,
												correct: topic.correct,
												incorrect: topic.incorrect,
											})
										)}
										margin={{
											top: 20,
											right: 30,
											left: 20,
											bottom: Math.min(
												subjects[activeTab].topics
													.length * 8,
												200
											), // Dynamic bottom margin
										}}
										layout="horizontal" // Keep horizontal layout
									>
										<XAxis
											dataKey="name"
											tick={{
												fontSize: 12,
												fontWeight: "bold",
												fill: colors.primary, // Added color for better visibility
											}}
											interval={0}
											angle={-45} // Optimal angle for readability
											textAnchor="end"
											height={Math.min(
												subjects[activeTab].topics
													.length * 12,
												200
											)} // Dynamic height
											tickMargin={10} // Added space between ticks and labels
										/>
										<YAxis
											tick={{
												fontSize: 12,
												fontWeight: "bold",
											}}
										/>
										<Tooltip
											content={<CustomTooltip />}
											wrapperStyle={{
												minWidth: "250px",
												fontFamily:
													"'Bubblegum Sans', cursive",
												fontSize: "14px",
												fontWeight: "bold",
												zIndex: 1000,
												backgroundColor:
													colors.background,
												borderRadius: "12px",
												padding: "10px",
												boxShadow: `0 0 10px ${colors.primary}20`,
											}}
										/>
										<Bar
											dataKey="correct"
											fill={colors.success}
											radius={[4, 4, 0, 0]}
											animationDuration={1500}
										/>
										<Bar
											dataKey="incorrect"
											fill="#f87171"
											radius={[4, 4, 0, 0]}
											animationDuration={1500}
										/>
									</BarChart>
								</ResponsiveContainer>
							</div>

							<h4
								className="text-xl font-semibold mb-4"
								style={{ color: colors.primary }}
							>
								Topic Details
							</h4>

							<div className="space-y-4">
								{subjects[activeTab].topics.map((topic) => (
									<TopicCard
										key={topic.topic}
										topic={topic.topic}
										correct={topic.correct}
										incorrect={topic.incorrect}
										total={topic.total}
										icon={
											topicIcons[topic.topic] ||
											subjectIcons[activeTab] || (
												<BookOpen className="w-5 h-5" />
											)
										}
									/>
								))}
							</div>
						</>
					)}
				</motion.div>
			</AnimatePresence>
		</div>
	);
}
