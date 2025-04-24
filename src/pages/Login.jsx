import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2, LogIn } from "lucide-react";
import { profile, signIn } from "../services/auth";
import useStore from "../store/store";

const Login = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const { login } = useStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		try {
			const response = await signIn(email, password);
			const profile = await profile();

			login(
				response?.data?.token,
				response?.data?.session_id,
				response?.data?.account_id,
				profile?.user,
				profile?.user_stats
			);

			sessionStorage.setItem("token", response?.data.token);

			navigate("/dashboard");
		} catch (err) {
			console.log(err);
			setError(err.response?.data?.error || "Invalid email or password");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="h-screen w-screen overflow-hidden relative flex items-center justify-center">
			{/* Gradient Background */}
			<div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500" />

			{/* Floating Elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-20 left-10 w-32 h-32 bg-yellow-300/50 rounded-full animate-float" />
				<div className="absolute top-40 right-20 w-24 h-24 bg-green-300/50 rounded-full animate-float-delay" />
				<div className="absolute bottom-20 left-1/4 w-40 h-40 bg-pink-300/50 rounded-full animate-float-slow" />
				<div className="absolute bottom-40 right-1/3 w-20 h-20 bg-blue-300/50 rounded-full animate-float-delay-slow" />
				<div className="absolute top-1/3 left-1/3 w-36 h-36 bg-purple-300/50 rounded-full animate-float" />
			</div>

			{/* Content Container */}
			<div className="container mx-auto px-4 z-10 flex flex-col lg:flex-row items-center justify-center h-full max-w-7xl">
				{/* Left Side - Branding */}
				<motion.div
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
					className="hidden lg:flex lg:w-1/2 flex-col justify-center items-start p-12 h-full"
				>
					<motion.div
						className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg mb-8"
						whileHover={{ scale: 1.1, rotate: 5 }}
					>
						<LogIn className="h-10 w-10 text-purple-600" />
					</motion.div>
					<motion.h1
						className="text-4xl font-bold text-white mb-4"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
					>
						Welcome to GradeNext!
					</motion.h1>
					<motion.p
						className="text-xl text-white mb-8 max-w-md"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
					>
						Sign in to continue your fun learning adventure!
					</motion.p>

					<motion.div
						className="flex space-x-6"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
					>
						<motion.div
							className="w-16 h-16 rounded-full bg-yellow-400/80 flex items-center justify-center shadow-lg"
							whileHover={{ scale: 1.1, rotate: 10 }}
						>
							<span className="text-3xl">🧠</span>
						</motion.div>
						<motion.div
							className="w-16 h-16 rounded-full bg-green-400/80 flex items-center justify-center shadow-lg"
							whileHover={{ scale: 1.1, rotate: -10 }}
						>
							<span className="text-3xl">🎮</span>
						</motion.div>
						<motion.div
							className="w-16 h-16 rounded-full bg-blue-400/80 flex items-center justify-center shadow-lg"
							whileHover={{ scale: 1.1, rotate: 10 }}
						>
							<span className="text-3xl">🎯</span>
						</motion.div>
					</motion.div>
				</motion.div>

				{/* Right Side - Login Form */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="w-full lg:w-1/2 flex items-center justify-center h-full py-8 md:py-12"
				>
					<div className="w-full max-w-md border-4 border-purple-300 shadow-xl bg-white rounded-3xl overflow-hidden mx-4">
						{/* Card Header */}
						<div className="pb-2 bg-gradient-to-r from-purple-100 to-blue-100">
							<motion.div
								initial={{ scale: 0.8, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								className="flex justify-center mb-4 pt-6"
							>
								<div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
									<span className="text-4xl">👋</span>
								</div>
							</motion.div>
							<h2 className="text-2xl font-bold text-center text-purple-800">
								Hello Friend!
							</h2>
							<p className="text-center text-purple-600 mt-2 pb-4">
								Enter your details to start the fun
							</p>
						</div>

						{/* Card Content */}
						<div className="px-6 sm:px-8 py-6">
							<form className="space-y-5" onSubmit={handleSubmit}>
								<motion.div
									className="space-y-2"
									initial={{ x: -20, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
								>
									<label className="text-sm font-medium text-purple-700 flex items-center">
										<Mail className="h-4 w-4 mr-2 text-purple-500" />
										Email
									</label>
									<input
										type="email"
										required
										className="w-full px-4 py-3 bg-purple-50 border-2 border-purple-200 text-purple-900 placeholder-purple-400 focus:border-purple-500 rounded-xl"
										placeholder="your.email@example.com"
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
									/>
								</motion.div>

								<motion.div
									className="space-y-2"
									initial={{ x: -20, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
								>
									<div className="flex items-center justify-between">
										<label className="text-sm font-medium text-purple-700 flex items-center">
											<Lock className="h-4 w-4 mr-2 text-purple-500" />
											Password
										</label>
										<Link
											to="/forgot-password"
											className="text-sm text-blue-600 hover:text-blue-500"
										>
											Forgot password?
										</Link>
									</div>
									<div className="relative">
										<input
											type={
												showPassword
													? "text"
													: "password"
											}
											required
											className="w-full px-4 py-3 bg-purple-50 border-2 border-purple-200 text-purple-900 placeholder-purple-400 focus:border-purple-500 rounded-xl"
											placeholder="••••••••"
											value={password}
											onChange={(e) =>
												setPassword(e.target.value)
											}
										/>
										<button
											type="button"
											onClick={() =>
												setShowPassword(!showPassword)
											}
											className="absolute right-3 top-3 text-purple-500 hover:text-purple-700"
										>
											{showPassword ? "🙈" : "👁️"}
										</button>
									</div>
								</motion.div>

								{error && (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										className="text-red-500 text-sm text-center"
									>
										{error}
									</motion.div>
								)}

								<motion.div
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
								>
									<button
										type="submit"
										disabled={isLoading}
										className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
									>
										{isLoading ? (
											<>
												<Loader2 className="h-5 w-5 animate-spin" />
												Signing in...
											</>
										) : (
											<>
												<span>🚀</span>
												Let's Go!
											</>
										)}
									</button>
								</motion.div>
							</form>

							{/* <motion.div
                className="mt-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-purple-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-purple-600">Or continue with</span>
                  </div>
                </div>

                <button className="w-full mt-4 py-3 px-4 border-2 border-purple-200 rounded-xl text-purple-700 bg-white hover:bg-purple-50 flex items-center justify-center">
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-5 h-5 mr-2"
                  />
                  Sign in with Google
                </button>
              </motion.div> */}
						</div>

						{/* Card Footer */}
						<div className="bg-gradient-to-r from-purple-100 to-blue-100 py-4 text-center">
							<p className="text-sm text-purple-700">
								Don't have an account?{" "}
								<Link
									to="/signup"
									className="text-blue-600 hover:text-blue-500 font-semibold"
								>
									Sign up
								</Link>
							</p>
						</div>
					</div>
				</motion.div>
			</div>

			{/* Animation Styles */}
			<style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes float-delay {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes float-slow {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(8deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes float-delay-slow {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(-8deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delay { animation: float-delay 7s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-delay-slow { animation: float-delay-slow 9s ease-in-out infinite; }
      `}</style>
		</div>
	);
};

export default Login;
