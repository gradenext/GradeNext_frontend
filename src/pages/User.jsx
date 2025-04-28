import { AnimatePresence, motion } from "framer-motion";
import {
	BarChart2,
	LayoutDashboard,
	User,
	Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { profile } from "../services/auth";
import useStore from "../store/store";

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
	const tab = pathname?.split("/")[2] || "profile";
	const setUserData = useStore((state) => state?.setUserData);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchUser = async () => {
		try {
			setIsLoading(true);
			setError(null);
			const user = await profile();
			setUserData(user?.user, user?.user_stats);
		} catch (err) {
			console.error("Failed to fetch user:", err);
			setError("Failed to load user data. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchUser();
	}, []);

	const navItems = [
		{
			name: "profile",
			label: "My Profile",
			icon: <User className="w-5 h-5 flex-shrink-0" />,
			path: "/user/profile",
		},
		{
			name: "stats",
			label: "My Progress",
			icon: <BarChart2 className="w-5 h-5 flex-shrink-0" />,
			path: "/user/stats",
		},
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 sm:px-12 py-6">
			{/* Navigation Bar */}
			<motion.div
				className="mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1, duration: 0.4 }}
			>
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4">
					<div className="flex-1 min-w-0 mb-4 sm:mb-0">
						<div className="flex space-x-1 overflow-x-auto pb-2 scrollbar-hide w-full">
							{navItems.map((item) => (
								<motion.button
									key={item.name}
									whileHover={{ scale: 1.03 }}
									whileTap={{ scale: 0.97 }}
									className={`px-4 sm:px-6 py-3 rounded-lg font-medium transition-all flex items-center space-x-2 flex-shrink-0 cursor-pointer ${
										tab === item.name
											? "text-white shadow-md"
											: "text-gray-700 hover:bg-gray-100"
									}`}
									style={{
										backgroundColor:
											tab === item.name
												? colors.primary
												: "transparent",
										minWidth: "120px",
										maxWidth: "200px",
									}}
									onClick={() => navigate(item.path)}
									layout
								>
									{item.icon}
									<span className="truncate">
										{item.label}
									</span>
								</motion.button>
							))}
						</div>
					</div>

					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="px-4 sm:px-6 py-3 rounded-lg font-medium transition-all flex items-center space-x-2 shadow-sm flex-shrink-0 cursor-pointer"
						style={{
							backgroundColor: colors.secondary,
							color: "white",
							minWidth: "160px",
						}}
						onClick={() => navigate("/dashboard")}
					>
						<LayoutDashboard className="w-5 h-5 flex-shrink-0" />
						<span className="truncate">Back to Dashboard</span>
					</motion.button>
				</div>
			</motion.div>

			{/* Loading or Error State */}
			<AnimatePresence>
				{(isLoading || error) && (
					<motion.div
						className="mx-auto mt-6 bg-white rounded-2xl shadow-lg p-6"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
					>
						<div className="flex flex-col items-center justify-center h-64 gap-4">
							{isLoading ? (
								<>
									<motion.div
										animate={{ rotate: 360 }}
										transition={{
											repeat: Infinity,
											duration: 1.5,
											ease: "linear",
										}}
									>
										<Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
									</motion.div>
									<motion.h3
										initial={{ y: 10 }}
										animate={{ y: 0 }}
										transition={{
											repeat: Infinity,
											repeatType: "reverse",
											duration: 1,
										}}
										className="text-xl font-semibold text-gray-700"
									>
										Loading your dashboard...
									</motion.h3>
								</>
							) : (
								<>
									<XCircle className="w-12 h-12 text-red-500" />
									<h3 className="text-xl font-semibold text-gray-700">
										{error}
									</h3>
									<motion.button
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className="px-6 py-2 rounded-lg font-medium text-white"
										style={{
											backgroundColor: colors.primary,
										}}
										onClick={fetchUser}
									>
										Retry
									</motion.button>
								</>
							)}
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Content Area */}
			{!isLoading && !error && (
				<motion.div
					className="mx-auto mt-6"
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
			)}
		</div>
	);
}
