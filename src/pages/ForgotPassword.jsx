import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserPlus,
  User,
  Users,
  School,
  Mail,
  Lock,
  Loader2,
  Phone,
  ChevronDown,
  CheckCircle,
} from "lucide-react";
import { forgetPassword, resetPassword } from "../services/auth";

const getStepTitle = (step) => {
  switch (step) {
    case 1:
      return "Tell Us Your Email";
    case 2:
      return "Reset Your Password";
    default:
      return "Sign Up";
  }
};

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const newOtp = [...otp];

    if (value.length === 1) {
      newOtp[index] = value;
      setOtp(newOtp);
      const nextInput = document.querySelector(`input[name=otp${index + 1}]`);
      if (nextInput) nextInput.focus();
    } else if (value === "") {
      newOtp[index] = "";
      setOtp(newOtp);
    }

    setError("");
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else {
        const prevInput = document.querySelector(`input[name=otp${index - 1}]`);
        if (prevInput) prevInput.focus();
      }
    }
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.email) return "Email is required";
    } else if (step === 2) {
      if (!formData.password) return "Password is required";
      if (formData.password.length < 6)
        return "Password must be at least 6 characters";
      if (otp.join("").length !== 6) return "Enter valid 6 digit OTP";
    }
    return null;
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-700 flex items-center">
              <Mail className="h-4 w-4 mr-2 text-purple-500" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-purple-50 border-2 border-purple-200 text-purple-900 rounded-xl"
              placeholder="parent@example.com"
              required
            />
          </div>
        );

      case 2:
        return (
          <div className="grid grid-cols-1 gap-4">
            <p className="text-sm text-purple-700">
              📧 An email has been sent to{" "}
              <span className="font-semibold">{formData.email}</span> with a
              verification code.
            </p>

            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-700 flex items-center">
                <Lock className="h-4 w-4 mr-2 text-purple-500" />
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-purple-50 border-2 border-purple-200 text-purple-900 rounded-xl"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-purple-500"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-700 flex items-center">
                <Lock className="h-4 w-4 mr-2 text-purple-500" />
                OTP
              </label>
              <div className="flex justify-center flex-wrap gap-1">
                {[...Array(6)].map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    name={`otp${i}`}
                    value={otp[i] || ""}
                    onChange={(e) => handleOtpChange(e, i)}
                    onKeyDown={(e) => handleOtpKeyDown(e, i)}
                    className="w-12 h-12 md:w-14 md:h-14 text-center text-xl font-semibold bg-gradient-to-b from-purple-50 to-purple-100 border-2 border-purple-300 text-purple-900 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  />
                ))}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className=" flex items-center justify-center  px-4">
            <div className="bg-white border-2 border-purple-200 rounded-xl shadow-md p-8 max-w-md w-full text-center space-y-6">
              <CheckCircle className="h-12 w-12 text-purple-600 mx-auto" />
              <h2 className="text-2xl font-semibold text-purple-700">
                Password Reset Successful
              </h2>
              <p className="text-purple-600">
                Your password has been updated. You can now log in with your new
                credentials.
              </p>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition"
              >
                Go to Login
              </button>
            </div>
          </div>
        );
    }
  };

  const handleForget = async (e) => {
    e.preventDefault();
    const error = validateStep();
    if (error) {
      setError(error);
      return;
    }
    setLoading(true);
    try {
      await forgetPassword(formData?.email);
      setStep(2);
    } catch (err) {
      console.log(err);
      setError(err?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    const error = validateStep();
    if (error) {
      setError(error);
      return;
    }

    setLoading(true);
    try {
      await resetPassword(formData?.email, otp.join(""), formData?.password);
      setStep(3);
    } catch (err) {
      console.log(err);
      setError(err?.data?.error || err?.data?.password);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen overflow-hidden relative flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-300/50 rounded-full animate-float" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-300/50 rounded-full animate-float-delay" />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-pink-300/50 rounded-full animate-float-slow" />
        <div className="absolute bottom-40 right-1/3 w-20 h-20 bg-blue-300/50 rounded-full animate-float-delay-slow" />
      </div>

      <div className="container mx-auto px-4 z-10 flex flex-col lg:flex-row items-center justify-center h-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:flex lg:w-1/2 flex-col justify-center items-start p-12"
        >
          <motion.div
            className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg mb-8"
            whileHover={{ scale: 1.1 }}
          >
            <UserPlus className="h-10 w-10 text-purple-600" />
          </motion.div>
          <motion.h1 className="text-4xl font-bold text-white mb-4">
            Join Our Learning Adventure!
          </motion.h1>
          <motion.p className="text-xl text-white mb-8 max-w-md">
            Create an account to start your magical learning journey!
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full lg:w-1/2 flex items-center justify-center py-12 px-4"
        >
          <div className="w-full max-w-2xl border-4 border-purple-300 shadow-xl bg-white rounded-3xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6">
              <h2 className="text-2xl font-bold text-center text-purple-800">
                {getStepTitle(step)}
              </h2>
              <p className="text-center text-purple-600 mt-2">
                Step {step} of 3
              </p>

              <div className="w-full bg-purple-100 rounded-full h-2.5 mt-4">
                <div
                  className="bg-gradient-to-r from-purple-600 to-blue-600 h-2.5 rounded-full transition-all"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>

            <div className="px-6 py-4">
              <form>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6 my-4"
                  >
                    {renderStepContent()}
                  </motion.div>
                </AnimatePresence>

                {error && (
                  <div className="text-red-500 text-sm text-center my-4">
                    {error}
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
                  {step === 2 && (
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-2 text-purple-700 bg-white border-2 border-purple-300 rounded-xl hover:bg-purple-50 transition-colors"
                    >
                      👈 Back
                    </button>
                  )}
                  {step === 1 && (
                    <button
                      type="submit"
                      disabled={loading}
                      onClick={handleForget}
                      className=" px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50"
                    >
                      {loading ? (
                        <Loader2 className="h-5 w-5 animate-spin mx-4" />
                      ) : (
                        "Send OTP"
                      )}
                    </button>
                  )}
                  {step === 2 && (
                    <button
                      type="submit"
                      disabled={loading}
                      onClick={handleReset}
                      className=" px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50"
                    >
                      {loading ? (
                        <Loader2 className="h-5 w-5 animate-spin mx-4" />
                      ) : (
                        "Reset Password"
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-4 text-center">
              <p className="text-sm text-purple-700">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-500 font-semibold"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

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

export default Signup;
