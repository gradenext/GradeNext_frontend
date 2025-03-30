import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Quiz from "./pages/Quiz";
import ProtectedRoute from "./components/ProtectedRoute";
import useStore from "./store/store";

function App() {
	const token = useStore((state) => state.token);
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
					<Route path="/practice/:session_id" element={<Quiz />} />
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
