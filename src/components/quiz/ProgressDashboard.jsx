import React from "react";
import {
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Clock,
  CheckCircle,
  HelpCircle,
  BookOpen,
  Gauge,
} from "lucide-react";
import useStore from "../../store/store";

const COLORS = {
  purple: {
    light: "bg-purple-100",
    dark: "bg-purple-700",
    text: "text-purple-600",
  },
  green: {
    light: "bg-green-100",
    dark: "bg-green-700",
    text: "text-green-600",
  },
  blue: {
    light: "bg-blue-100",
    dark: "bg-blue-700",
    text: "text-blue-600",
  },
  orange: {
    light: "bg-orange-100",
    dark: "bg-orange-700",
    text: "text-orange-600",
  },
};

function ProgressDashboard() {
  const { session_stats } = useStore((state) => state.analytics);
  const hintsUsed = useStore((state) => state.usedHints);
  const avgTimeTaken = useStore((state) => state.avgTimeTaken);

  // Calculate totals
  const totalQuestions =
    (session_stats?.correct || 0) + (session_stats?.incorrect || 0);
  const accuracy =
    totalQuestions > 0
      ? Math.round((session_stats?.correct / totalQuestions) * 100)
      : 0;

  // Prepare chart data
  const pieData = [
    { name: "Correct", value: session_stats?.correct || 0, color: "#4ade80" },
    {
      name: "Incorrect",
      value: session_stats?.incorrect || 0,
      color: "#fb7185",
    },
  ];

  // Custom tooltip for line chart
  const CustomLineTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200">
          <p className="font-bold text-sm text-purple-700">Question {label}</p>
          <p className="text-sm">
            <span className="text-blue-600">Time Taken:</span>{" "}
            {payload[0].value}s
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
      className="w-full"
    >
      <div className="p-6 rounded-3xl border-4 border-pink-300 bg-white shadow-xl relative overflow-hidden">
        {/* Fun Decorative Elements */}
        <div className="absolute -right-8 -top-8 w-16 h-16 bg-yellow-200 rounded-full opacity-50 animate-bounce -z-10"></div>
        <div className="absolute -left-8 -bottom-8 w-16 h-16 bg-blue-200 rounded-full opacity-50 animate-pulse -z-10"></div>
        <div className="absolute top-3 right-3 text-2xl animate-spin-slow">
          🌟
        </div>

        {/* Header */}
        <div className="flex flex-col gap-y-4 items-center mb-4 text-center">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-blue-500 text-transparent bg-clip-text">
            <Trophy className="inline mr-2 h-7 w-7 text-yellow-500" />
            Your Progress Overview
          </h2>

          <motion.div
            className="bg-[#FEF3C7] p-2 rounded-xl shadow w-full"
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center justify-center gap-3">
              <Gauge className="h-5 w-5 text-purple-600" />
              <div className="text-lg font-bold text-purple-800">
                {accuracy}%
              </div>
              <div className="text-xs text-gray-700">Accuracy</div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-purple-100 h-3 rounded-full">
              <div
                className="bg-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${accuracy}%` }}
              ></div>
            </div>
          </motion.div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 gap-3 mb-6">
          {[
            {
              value: totalQuestions,
              label: "Total Questions",
              color: "pink",
              icon: <BookOpen className="h-6 w-6" />,
            },
            {
              value: session_stats?.correct || 0,
              label: "Correct Answers",
              color: "green",
              icon: <CheckCircle className="h-6 w-6" />,
            },
            {
              value: hintsUsed || 0,
              label: "Hints Used",
              color: "blue",
              icon: <HelpCircle className="h-6 w-6" />,
            },
            {
              value: `${Math.round(avgTimeTaken || 0)}s`,
              label: "Avg Time/Question",
              color: "yellow",
              icon: <Clock className="h-6 w-6" />,
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -3 }}
              className={`bg-${stat.color}-100 rounded-xl shadow-md flex items-center gap-1`}
            >
              <div className={`p-2 rounded-full text-${stat.color}-600`}>
                {stat.icon}
              </div>
              <div className="flex gap-2 items-center">
                <div className="text-lg font-bold text-gray-800">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="">
          {/* Pie Chart */}
          {/* Pie Chart */}
          <div className="bg-pink-50 p-4 rounded-xl border border-pink-200">
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} answers`]} />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconSize={10}
                    wrapperStyle={{ fontSize: "12px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProgressDashboard;
