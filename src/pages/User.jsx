import { AnimatePresence, motion } from "framer-motion";
import {
	BarChart2,
	LayoutDashboard,
	User,
	Sparkles,
	Rocket,
} from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const colors = {
	primary: "#6C63FF", // Purple
	secondary: "#FF9F4A", // Orange
	accent: "#4ACBFF", // Blue
	success: "#6DD400", // Green
	background: "#FFF8F0", // Warm white
};

export default function Dashboard() {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const tab = pathname?.split("/")[2] || "profile"; // Fixed array access

	const handleLogout = () => {
		// Add your logout logic here
		console.log("User logged out");
	};

	return (
		<div
			className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 sm:px-12 py-6"
			style={{ fontFamily: "'Bubblegum Sans', cursive" }}
		>
			<motion.div
				className="mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1, duration: 0.4 }}
			>
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4">
					<div className="flex-1 min-w-0 mb-4 sm:mb-0">
						{" "}
						<div className="flex space-x-1 overflow-x-auto pb-2 scrollbar-hide w-full">
							{" "}
							<motion.button
								whileHover={{ scale: 1.03 }}
								whileTap={{ scale: 0.97 }}
								className={`px-4 sm:px-6 py-3 rounded-lg font-medium transition-all flex items-center space-x-2 flex-shrink-0 cursor-pointer ${
									tab === "profile"
										? "text-white shadow-md"
										: "text-gray-700 hover:bg-gray-100"
								}`}
								style={{
									backgroundColor:
										tab === "profile"
											? colors.primary
											: "transparent",
									minWidth: "120px",
									maxWidth: "200px",
								}}
								onClick={() => navigate("/user/profile")}
								layout
							>
								<User className="w-5 h-5 flex-shrink-0" />{" "}
								<span className="truncate">My Profile</span>{" "}
							</motion.button>
							<motion.button
								whileHover={{ scale: 1.03 }}
								whileTap={{ scale: 0.97 }}
								className={`px-4 sm:px-6 py-3 rounded-lg font-medium transition-all flex items-center space-x-2 flex-shrink-0 cursor-pointer ${
									tab === "stats"
										? "text-white shadow-md"
										: "text-gray-700 hover:bg-gray-100"
								}`}
								style={{
									backgroundColor:
										tab === "stats"
											? colors.primary
											: "transparent",
									minWidth: "120px",
									maxWidth: "200px",
								}}
								onClick={() => navigate("/user/stats")}
								layout
							>
								<BarChart2 className="w-5 h-5 flex-shrink-0" />{" "}
								<span className="truncate">My Progess</span>{" "}
							</motion.button>
						</div>
					</div>

					{/* Dashboard Button */}
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="px-4 sm:px-6 py-3 rounded-lg font-medium transition-all flex items-center space-x-2 shadow-sm flex-shrink-0 cursor-pointer"
						style={{
							backgroundColor: colors.secondary,
							color: "white",
							minWidth: "160px", // Added minWidth
						}}
						onClick={() => navigate("/dashboard")}
					>
						<LayoutDashboard className="w-5 h-5 flex-shrink-0" />
						<span className="truncate">Back to Dashboard</span>{" "}
					</motion.button>
				</div>
			</motion.div>

			{/* Enhanced Content Area */}
			<motion.div
				className=" mx-auto mt-6"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2, duration: 0.5 }}
			>
				<AnimatePresence mode="wait">
					<motion.div
						key={tab}
						initial={{ y: 10, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: -10, opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="bg-white rounded-2xl shadow-lg p-6"
					>
						<Outlet />
					</motion.div>
				</AnimatePresence>
			</motion.div>
		</div>
	);
}
