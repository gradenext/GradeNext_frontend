import React from "react";
import useStore from "../../store/store";
import { motion } from "framer-motion";
import {
	Bookmark,
	BookOpen,
	Globe,
	Key,
	Mail,
	MapPin,
	User,
	Users,
	Rocket,
	Sparkles,
	VenusAndMars,
} from "lucide-react";

const colors = {
	primary: "#6C63FF", // Purple
	secondary: "#FF9F4A", // Orange
	accent: "#4ACBFF", // Blue
	success: "#6DD400", // Green
	background: "#FFF8F0", // Warm white
};

const UserProfile = () => {
	const user = useStore((state) => state.user);

	// Enhanced profile fields with icons and colors
	const profileFields = [
		{
			label: "Student Name",
			value: user.student_name,
			icon: <User className="w-5 h-5" />,
			color: colors.primary,
		},
		{
			label: "Parent Name",
			value: user.parent_name,
			icon: <Users className="w-5 h-5" />,
			color: colors.secondary,
		},
		{
			label: "Email Address",
			value: user.email,
			icon: <Mail className="w-5 h-5" />,
			color: colors.accent,
		},
		{
			label: "Gender",
			value: user.gender,
			icon: <VenusAndMars className="w-5 h-5" />,
			color: colors.success,
		},
		{
			label: "Grade Level",
			value: user.grade,
			icon: <BookOpen className="w-5 h-5" />,
			color: colors.primary,
		},
		{
			label: "Enrolled Courses",
			value: user.courses.join(", "),
			icon: <Bookmark className="w-5 h-5" />,
			color: colors.secondary,
		},
		{
			label: "Country",
			value: user.country,
			icon: <Globe className="w-5 h-5" />,
			color: colors.accent,
		},
		{
			label: "State/Region",
			value: user.state,
			icon: <MapPin className="w-5 h-5" />,
			color: colors.success,
		},
	];

	return (
		<div className="space-y-8 max-w-4xl mx-auto p-4 sm:p-6">
			{/* Enhanced Header with Animation */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="text-center"
			>
				<motion.div
					animate={{ rotate: [0, 15, -15, 0] }}
					transition={{ repeat: Infinity, duration: 4 }}
					className="inline-block mb-4"
				>
					<Rocket
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
						textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
					}}
				>
					My Profile
				</h2>
				<p className="text-lg sm:text-xl text-gray-700 mb-3">
					Your personal learning journey
				</p>
				<div
					className="h-1 w-24 mx-auto rounded-full"
					style={{ background: colors.accent }}
				></div>
			</motion.div>

			{/* Animated Avatar */}
			<motion.div
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{ type: "spring", stiffness: 200, damping: 10 }}
				className="flex justify-center"
			>
				<div className="relative">
					<img
						src={`https://api.dicebear.com/9.x/adventurer/svg?seed=Eliza`}
						alt="User Avatar"
						className="w-32 h-32 rounded-full border-4 shadow-lg"
						style={{ borderColor: colors.primary }}
					/>
					<motion.div
						animate={{ scale: [1, 1.1, 1] }}
						transition={{ repeat: Infinity, duration: 2 }}
						className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md"
					>
						<Sparkles
							className="w-6 h-6"
							style={{ color: colors.secondary }}
						/>
					</motion.div>
				</div>
			</motion.div>

			{/* Enhanced Profile Info Cards */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.3, duration: 0.5 }}
				className="bg-white p-6 rounded-2xl shadow-lg border"
				style={{
					borderColor: `${colors.primary}20`,
					background: `linear-gradient(to bottom right, ${colors.background} 0%, white 50%)`,
					boxShadow: `0 4px 20px ${colors.primary}20`,
				}}
			>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
					{profileFields.map((field, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 + index * 0.05 }}
							whileHover={{ y: -5 }}
							className="flex items-start space-x-4 p-4 rounded-xl transition-all"
							style={{
								backgroundColor: `${field.color}10`,
								borderLeft: `4px solid ${field.color}`,
							}}
						>
							<div
								className="p-3 rounded-xl flex-shrink-0"
								style={{
									backgroundColor: `${field.color}20`,
									color: field.color,
								}}
							>
								{field.icon}
							</div>
							<div className="flex-1 min-w-0">
								<h3
									className="text-sm font-semibold mb-1"
									style={{ color: colors.primary }}
								>
									{field.label}
								</h3>
								<p
									className="text-lg font-medium truncate"
									style={{ color: colors.secondary }}
									title={field.value} // Show full text on hover
								>
									{field.value || (
										<span className="text-gray-500">
											Not specified
										</span>
									)}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</motion.div>
		</div>
	);
};

export default UserProfile;
