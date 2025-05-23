import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Quiz from "./pages/Quiz";
import useStore from "./store/store";
import TreasureHuntTopics from "./pages/TreasureHuntTopics";
import User from "./pages/User";
import ForgotPassword from "./pages/ForgotPassword";
import UserProfile from "./components/user/UserProfile";
import UserStats from "./components/user/UserStats";
import QuizReport from "./components/quiz/QuizReport";

function App() {
	try {
		const token = useStore((state) => state.token);

		return (
			<div
				style={{ fontFamily: "'Bubblegum Sans', cursive" }}
				className="min-h-screen bg-gray-50"
			>
				{!token ? (
					<Routes>
						<Route
							path="*"
							element={<Navigate to="/login" replace />}
						/>
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/forgot-password" element={<ForgotPassword />} />
					</Routes>
				) : (
					<Routes>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route
							path="/treasurehunt/topics/:subject"
							element={<TreasureHuntTopics />}
						/>
						<Route
							path="/treasurehunt/:session_id/:subject/:topic"
							element={<Quiz />}
						/>
						<Route path="/:mode/:session_id" element={<Quiz />} />
						<Route
							path="/report"
							element={<QuizReport />}
						/>
						<Route path="/user" element={<User />}>
							<Route path="profile" element={<UserProfile />} />
							<Route path="stats" element={<UserStats />} />
							<Route
								path="*"
								element={
									<Navigate to={"/user/profile"} replace />
								}
							/>
						</Route>
						<Route
							path="*"
							element={<Navigate to="/dashboard" replace />}
						/>
					</Routes>
				)}
			</div>
		);
	} catch (error) {
		console.log(error);
	}
}

export default App;
