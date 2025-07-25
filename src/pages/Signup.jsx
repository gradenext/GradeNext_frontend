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
  ShieldCheck,
  Rocket,
} from "lucide-react";
import { register, verifyOTP } from "../services/auth";
import toast from "react-hot-toast";

// const plans = [
//   {
//     id: "basic",
//     title: "Basic Plan",
//     price: "Free",
//     features: ["Limited practice", "Progress Tracking", "Email support"],
//   },
//   {
//     id: "pro",
//     title: "Pro Plan",
//     price: "$49/mo",
//     features: [
//       "Unlimited Questions",
//       "Revision Mode",
//       "Advanced Analytics",
//       "Priority email support",
//     ],
//   },
//   {
//     id: "enterprise",
//     title: "Enterprise",
//     price: "Custom",
//     features: [
//       "All Pro Features",
//       "Topic Practice",
//       "1-on-1 student mentoring",
//       "Custom Reports",
//       "Tutor support",
//     ],
//   },
// ];

// function PlanAccordion({ formData, setFormData }) {
//   const [openId, setOpenId] = useState(null);

//   const toggleAccordion = (id) => {
//     setOpenId((prev) => (prev === id ? null : id));
//     setFormData((prev) => ({ ...prev, plan: id }));
//   };

//   return (
//     <div className="space-y-4">
//       {plans.map((plan) => (
//         <motion.div
//           key={plan.id}
//           whileHover={{ scale: 1.01 }}
//           className={`cursor-pointer p-4 rounded-2xl border transition-all duration-300 shadow-sm ${
//             formData.plan === plan.id
//               ? "border-purple-500 bg-purple-50"
//               : "border-purple-200 bg-white"
//           }`}
//           onClick={() => toggleAccordion(plan.id)}
//         >
//           <div className="flex justify-center items-center gap-2 ms:items-center">
//             <div className="w-full flex flex-col sm:flex-row justify-between sm:items-center gap-3">
//               <h3 className="text-lg font-semibold text-purple-800">
//                 {plan.title}
//               </h3>
//               <p className="text-xl font-bold text-purple-600">{plan.price}</p>
//             </div>
//             <ChevronDown
//               className={`text-purple-600 transition-transform duration-300 ${
//                 openId === plan.id ? "rotate-180" : "rotate-0"
//               }`}
//             />
//           </div>

//           <AnimatePresence>
//             {openId === plan.id && (
//               <motion.ul
//                 className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-purple-700"
//                 initial={{ height: 0, opacity: 0 }}
//                 animate={{ height: "auto", opacity: 1 }}
//                 exit={{ height: 0, opacity: 0 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 {plan.features.map((feature) => (
//                   <li
//                     key={feature}
//                     className="flex items-start gap-2 text-sm sm:text-base"
//                   >
//                     <span className="text-green-600">✔️</span>
//                     <span>{feature}</span>
//                   </li>
//                 ))}
//               </motion.ul>
//             )}
//           </AnimatePresence>
//         </motion.div>
//       ))}
//     </div>
//   );
// }
const availableCourses = [
  { id: "mathematics", label: "Mathematics", emoji: "🧮" },
  { id: "english", label: "English", emoji: "📚" },
  // { id: "computer", label: "Computer Language", emoji: "📚" },
  { id: "science", label: "Science", emoji: "🧪" },
  { id: "programming", label: "Computer Programming", emoji: "💻" },
];

const getStepTitle = (step) => {
  switch (step) {
    case 1:
      return "Tell Us About You";
    case 2:
      return "Where Are You From?";
    // case 3:
    //   return "Choose Your Plan";
    case 3:
      return "Create Your Account";
    case 4:
      return "Verify Your Account";
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
    confirm_password: "",
    student_name: "",
    parent_name: "",
    gender: "male",
    grade: "1",
    courses: ["mathematics"],
    country: "",
    state: "",
    zip_code: "",
    address: "",
    mobileNo: "",
    // plan: "basic",
    coupon_code: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));

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

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const courses = formData.courses.includes(value)
        ? formData.courses.filter((c) => c !== value)
        : [...formData.courses, value];
      setFormData((prev) => ({ ...prev, courses }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.student_name) return "Student name is required";
      if (!formData.parent_name) return "Parent name is required";
      if (!formData.gender) return "Gender is required";
      if (!formData.grade) return "Grade is required";
      if (formData.courses.length === 0)
        return "At least one course must be selected";
    } else if (step === 2) {
      if (!formData.country) return "Country is required";
      if (!formData.state) return "State is required";
      if (!formData.zip_code) return "Zip code is required";
    }
    // else if (step === 3) {
    //   if (!formData.plan) return "Please select a plan";
    //   if (formData.coupon_code && formData.coupon_code !== "NG100") {
    //     return "Invalid coupon code";
    //   }
    // }
    else if (step === 3) {
      if (!formData.email) return "Email is required";
      if (!formData.password) return "Password is required";
      if (formData.password.length < 6)
        return "Password must be at least 6 characters";
      if (formData.password !== formData.confirm_password)
        return "Passwords do not match";
    }
    return null;
  };

  const nextStep = () => {
    const error = validateStep();
    if (error) {
      setError(error);
      return;
    }
    setError("");
    setStep(Math.min(step + 1, 3));
  };

  const prevStep = () => {
    setError("");
    setStep(Math.max(step - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateStep();
    if (error) {
      setError(error);
      return;
    }

    setLoading(true);
    const id = toast.loading("Please wait...");
    try {
      const payload = {
        ...formData,
        grade: parseInt(formData.grade),
        // coupon_code: formData.coupon_code || undefined,
        // plan: formData.coupon_code === "NG100" ? "enterprise" : formData.plan,
      };

      await register(payload);
      setError("");
      setStep(4);
      toast.success("OTP sent");
    } catch (err) {
      setError(
        err?.email[0] ||
          "Registration failed. Please check all fields and try again."
      );
      toast.error(err?.email[0] || "Oops!! Something went wrong");
    } finally {
      setLoading(false);
      toast.dismiss(id);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    const otpValue = otp.join("");

    if (otpValue?.length !== 6) {
      setError("Please enter a valid 6 digit OTP");
      return;
    }

    setLoading(true);
    const id = toast.loading("Please wait...");
    try {
      await verifyOTP(formData?.email, otpValue);

      toast.success("Signup successfull");
      navigate("/login");
    } catch (error) {
      setError(
        error.error || "Verification failed. Please check otp and try again."
      );
      toast.error("Oops!! Something went wrong");
    } finally {
      setLoading(false);
      toast.dismiss(id);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-700 flex items-center">
                <User className="h-4 w-4 mr-2 text-purple-500" />
                Student Name
              </label>
              <input
                name="student_name"
                value={formData.student_name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-purple-50 border-2 border-purple-200 text-purple-900 rounded-xl"
                placeholder="Student's full name"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-700 flex items-center">
                <Users className="h-4 w-4 mr-2 text-purple-500" />
                Parent Name
              </label>
              <input
                name="parent_name"
                value={formData.parent_name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-purple-50 border-2 border-purple-200 text-purple-900 rounded-xl"
                placeholder="Parent's full name"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-700 flex items-center">
                <span className="mr-2">📚</span>
                Grade
              </label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-purple-50 border-2 border-purple-200 text-purple-900 rounded-xl"
                required
              >
                <option value="1">Grade 1</option>
                <option value="2">Grade 2</option>
                <option value="3">Grade 3</option>
                <option value="4">Grade 4</option>
                <option value="5">Grade 5</option>
                <option value="6">Grade 6</option>
                <option value="7">Grade 7</option>
                <option value="8">Grade 8</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-700 flex items-center">
                <span className="mr-2">👤</span>
                Gender
              </label>
              <div className="flex gap-4 pt-2">
                {["male", "female", "other"].map((gender) => (
                  <label key={gender} className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={formData.gender === gender}
                      onChange={handleChange}
                      className="h-4 w-4 text-purple-600 border-purple-300"
                    />
                    <span className="ml-2 text-purple-700 capitalize">
                      {gender === "male"
                        ? "Boy"
                        : gender === "female"
                        ? "Girl"
                        : "Other"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-purple-700 flex items-center">
                <span className="mr-2">🎯</span>
                Select Subjects
              </label>
              <div className="grid col-span-2 md:grid-cols-2 gap-2 bg-purple-50 p-3 rounded-xl border-2 border-purple-200">
                {availableCourses.map((course) => (
                  <motion.div
                    key={course.id}
                    whileHover={{ scale: 1.03 }}
                    className={`flex items-center p-2 rounded-lg ${
                      formData.courses.includes(course.id)
                        ? "bg-purple-100 border-2 border-purple-300"
                        : "bg-white"
                    }`}
                  >
                    <label className="flex items-center w-full">
                      <input
                        type="checkbox"
                        name="courses"
                        value={course.id}
                        checked={formData.courses.includes(course.id)}
                        onChange={handleChange}
                        className="h-4 w-4 text-purple-600 border-purple-300 rounded"
                      />
                      <span className="ml-2 text-purple-700 flex items-center">
                        <span className="text-xl mr-2">{course.emoji}</span>
                        {course.label}
                      </span>
                    </label>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-700 flex items-center">
                <span className="mr-2">🌎</span>
                Country
              </label>
              <input
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-purple-50 border-2 border-purple-200 text-purple-900 rounded-xl"
                placeholder="Your country"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-700 flex items-center">
                <span className="mr-2">🏙️</span>
                State
              </label>
              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-purple-50 border-2 border-purple-200 text-purple-900 rounded-xl"
                placeholder="Your state"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-700 flex items-center">
                <span className="mr-2">📮</span>
                Zip Code
              </label>
              <input
                name="zip_code"
                value={formData.zip_code}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-purple-50 border-2 border-purple-200 text-purple-900 rounded-xl"
                placeholder="Your zip code"
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-purple-700 flex items-center">
                <span className="mr-2">🏠</span>
                Address (Optional)
              </label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-purple-50 border-2 border-purple-200 text-purple-900 rounded-xl"
                placeholder="Your home address"
              />
            </div>
          </div>
        );

      // case 3:
      //   return (
      //     <div className="space-y-6">
      //       <PlanAccordion formData={formData} setFormData={setFormData} />
      //       <div className="space-y-2">
      //         <label className="text-sm font-medium text-purple-700">
      //           Have a coupon code?
      //         </label>
      //         <input
      //           name="coupon_code"
      //           value={formData.coupon_code}
      //           onChange={handleChange}
      //           className="w-full px-4 py-3 bg-purple-50 border-2 border-purple-200 text-purple-900 rounded-xl"
      //           placeholder="Enter coupon code"
      //         />
      //         {formData.coupon_code === "NG100" && (
      //           <p className="text-green-600 text-sm mt-2">
      //             🎉 NG100 applied! Enjoy Enterprise features!
      //           </p>
      //         )}
      //       </div>
      //     </div>
      //   );

      case 3:
        return (
          <div className="grid grid-cols-1 gap-4">
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

            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-700 flex items-center">
                <Lock className="h-4 w-4 mr-2 text-purple-500" />
                Password
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
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-purple-50 border-2 border-purple-200 text-purple-900 rounded-xl"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-purple-500"
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-700 flex items-center">
                <Phone className="h-4 w-4 mr-2 text-purple-500" />
                Mobile Number (Optional)
              </label>
              <input
                type="tel"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-purple-50 border-2 border-purple-200 text-purple-900 rounded-xl"
                placeholder="Your phone number"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="grid grid-cols-1 gap-4 w-full max-w-md mx-auto">
            <p className="text-sm sm:text-base text-center sm:text-left text-purple-700">
              📧 We've sent a verification code to{" "}
              <span className="font-semibold text-purple-900">
                {formData.email}
              </span>
              . Please enter the 6-digit code below to verify your email.
            </p>

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

            <p className="text-center text-sm text-purple-600 mt-2">
              Didn’t receive it?{" "}
              <button
                type="button"
                onClick={handleSubmit}
                className="text-purple-800 font-medium hover:underline hover:text-purple-900 transition"
              >
                Resend Code
              </button>
            </p>
          </div>
        );
    }
  };

  return (
    <div className=" min-h-screen w-screen relative flex items-center justify-center">
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
                Step {step} of 4
              </p>

              <div className="w-full bg-purple-100 rounded-full h-2.5 mt-4">
                <div
                  className="bg-gradient-to-r from-purple-600 to-blue-600 h-2.5 rounded-full transition-all"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </div>

            <div className="p-6">
              <form>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    {renderStepContent()}
                  </motion.div>
                </AnimatePresence>

                {error && (
                  <div className="text-red-500 text-sm text-center mt-4">
                    {error}
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-2 text-purple-700 bg-white border-2 border-purple-300 rounded-xl hover:bg-purple-50 transition-colors"
                    >
                      👈 Back
                    </button>
                  )}

                  {step < 3 && (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all"
                    >
                      Next 👉
                    </button>
                  )}
                  {step === 3 && (
                    <button
                      type="submit"
                      disabled={loading}
                      onClick={handleSubmit}
                      className="flex items-center justify-center gap-2 min-w-[200px] px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50"
                    >
                      {loading ? (
                        <Loader2 className="h-6 w-6 animate-spin" />
                      ) : (
                        <>
                          <ShieldCheck className="h-5 w-5" />
                          Verify my Account
                        </>
                      )}
                    </button>
                  )}

                  {step === 4 && (
                    <button
                      type="submit"
                      disabled={loading}
                      onClick={handleVerifyOTP}
                      className="flex items-center justify-center gap-2 min-w-[200px] px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50"
                    >
                      {loading ? (
                        <Loader2 className="h-6 w-6 animate-spin" />
                      ) : (
                        <>
                          <Rocket className="h-5 w-5" />
                          Start My Adventure
                        </>
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
