import React from "react";
import { motion } from "framer-motion";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	PieChart,
	Pie,
	Legend,
	Cell,
	CartesianGrid,
} from "recharts";
import {
	CheckCircle,
	XCircle,
	BookOpen,
	Target,
	Rocket,
	LayoutDashboard,
} from "lucide-react";
import useStore from "../../store/store";
import { useNavigate } from "react-router-dom";

const colors = {
	primary: "#6C63FF", // Purple
	secondary: "#FF9F4A", // Orange
	accent: "#4ACBFF", // Blue
	success: "#6DD400", // Green
	error: "#f87171", // Red
	background: "#FFF8F0", // Warm white
};

const CustomTooltip = ({ active, payload }) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-white p-3 rounded-lg shadow-lg border border-purple-200">
				<p className="font-bold text-purple-600">Performance</p>
				<p className="text-green-600">
					Correct:{" "}
					<span className="font-bold">{payload[0].value}</span>
				</p>
				<p className="text-red-500">
					Incorrect:{" "}
					<span className="font-bold">{payload[1].value}</span>
				</p>
			</div>
		);
	}
	return null;
};

const StatCard = ({ label, value, color, icon }) => (
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
				<div className="text-sm font-semibold" style={{ color }}>
					{label}
				</div>
				<div className="text-2xl font-bold text-purple-600">
					{value}
				</div>
			</div>
		</div>
	</motion.div>
);

const QuizReport = () => {
	const navigate = useNavigate();
	const data = useStore((state) => state?.analytics?.session_stats);
	const exitQuiz = useStore((state) => state?.exitQuiz);

	// Calculate total questions and accuracy safely
	const totalQuestions = (data?.correct || 0) + (data?.incorrect || 0);
	const accuracy =
		totalQuestions > 0
			? Math.round(((data?.correct || 0) / totalQuestions) * 100)
			: 0;

	// Prepare chart data
	const pieData = [
		{ name: "Correct", value: data?.correct || 0, color: colors.success },
		{ name: "Incorrect", value: data?.incorrect || 0, color: colors.error },
	];

	const barData = [
		{
			name: "Results",
			Correct: data?.correct || 0,
			Incorrect: data?.incorrect || 0,
		},
	];

	return (
		<motion.div
			className="min-h-screen p-6 bg-gray-50"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			{/* Header */}
			<div className="text-center mb-8">
				<motion.div
					animate={{ rotate: [0, 15, -15, 0] }}
					transition={{ repeat: Infinity, duration: 4 }}
					className="inline-block mb-4"
				>
					<Rocket className="w-12 h-12 text-purple-600" />
				</motion.div>
				<h1 className="text-3xl font-bold text-purple-600 mb-2 uppercase">
					Summary
				</h1>
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className="mx-auto px-4 sm:px-6 py-3 rounded-lg font-medium transition-all flex items-center space-x-2 shadow-sm flex-shrink-0 cursor-pointer"
					style={{
						backgroundColor: colors.secondary,
						color: "white",
						minWidth: "160px", // Added minWidth
					}}
					onClick={() => {
						exitQuiz();
						navigate("/dashboard");
					}}
				>
					<LayoutDashboard className="w-5 h-5 flex-shrink-0" />
					<span className="truncate">Go to Dashboard</span>{" "}
				</motion.button>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
				<StatCard
					label="Correct Answers"
					value={data?.correct || 0}
					color={colors.success}
					icon={<CheckCircle className="w-5 h-5" />}
				/>
				<StatCard
					label="Incorrect Answers"
					value={data?.incorrect || 0}
					color={colors.error}
					icon={<XCircle className="w-5 h-5" />}
				/>
				<StatCard
					label="Total Questions"
					value={totalQuestions}
					color={colors.primary}
					icon={<BookOpen className="w-5 h-5" />}
				/>
				<StatCard
					label="Accuracy"
					value={`${accuracy}%`}
					color={colors.accent}
					icon={<Target className="w-5 h-5" />}
				/>
			</div>

			{/* Chart Section */}
			<div className="bg-white p-6 rounded-xl shadow-lg">
				<h2 className="text-xl font-bold text-gray-800 mb-4">
					Performance Visualization
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
					{/* Pie Chart */}
					<div className="bg-white p-4 rounded-xl shadow-md h-64">
						<ResponsiveContainer width="100%" height="100%">
							<PieChart>
								<Pie
									data={pieData}
									cx="50%"
									cy="50%"
									labelLine={false}
									outerRadius={80}
									fill="#8884d8"
									dataKey="value"
									label={({ name, percent }) =>
										`${name}: ${(percent * 100).toFixed(
											0
										)}%`
									}
								>
									{pieData.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={entry.color}
										/>
									))}
								</Pie>
								<Tooltip />
								<Legend />
							</PieChart>
						</ResponsiveContainer>
					</div>

					{/* Horizontal Bar Chart */}
					<div className="bg-white p-4 rounded-xl shadow-md h-64">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart
								data={barData}
								layout="vertical"
								margin={{
									top: 20,
									right: 30,
									left: 20,
									bottom: 5,
								}}
							>
								<CartesianGrid
									strokeDasharray="3 3"
									horizontal={true}
									vertical={false}
								/>
								<XAxis type="number" />
								<YAxis dataKey="name" type="category" hide />
								<Tooltip content={<CustomTooltip />} />
								<Legend />
								<Bar
									dataKey="Correct"
									name="Correct Answers"
									fill={colors.success}
									radius={[0, 4, 4, 0]}
								/>
								<Bar
									dataKey="Incorrect"
									name="Incorrect Answers"
									fill={colors.error}
									radius={[0, 4, 4, 0]}
								/>
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>

				<div className="mt-6 flex flex-col sm:flex-row justify-between items-center sm:items-center">
					<div>
						<h4 className="text-lg font-semibold text-orange-500">
							Summary
						</h4>
						<p className="text-gray-700">
							You answered {data?.correct || 0} out of{" "}
							{totalQuestions} questions correctly ({accuracy}%
							accuracy).
						</p>
					</div>
					<div className="flex mt-4 sm:mt-0">
						<div className="flex items-center mr-4">
							<span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
							<span>Correct</span>
						</div>
						<div className="flex items-center">
							<span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
							<span>Incorrect</span>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default QuizReport;
