import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Quiz from "./pages/Quiz";
import ProtectedRoute from "./components/ProtectedRoute";
import useStore from "./store/store";
import { useEffect } from "react";

function App() {
	const token = useStore((state) => state.token);

	const storeReset = useStore((state) => state.reset);

	useEffect(() => {
		const handleBeforeUnload = () => {
			sessionStorage.setItem("isRefreshing", "true");
		};

		const handleUnload = () => {
			const isRefreshing =
				sessionStorage.getItem("isRefreshing") === "true";

			if (!isRefreshing) {
				storeReset();
			}

			sessionStorage.removeItem("isRefreshing");
		};

		window.addEventListener("beforeunload", handleBeforeUnload);
		window.addEventListener("unload", handleUnload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
			window.removeEventListener("unload", handleUnload);
		};
	}, [storeReset]);

	return (
		<div className="min-h-screen bg-gray-50">
			{!token ? (
				<Routes>
					<Route
						path="*"
						element={<Navigate to="/login" replace />}
					/>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
				</Routes>
			) : (
				<Routes>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/:mode/:session_id" element={<Quiz />} />
					<Route
						path="*"
						element={<Navigate to="/dashboard" replace />}
					/>
				</Routes>
			)}
		</div>
	);
}

export default App;
