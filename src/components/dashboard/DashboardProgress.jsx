import { motion } from "framer-motion";
import useStore from "../../store/store";
import { colors } from "../../constants/color";

const DashboardProgress = () => {
  const overallStats = useStore((state) => state.user_stats.overall);
  const stats = [
    {
      label: "📋 Total Questions",
      value: overallStats?.total,
    },
    {
      label: "✅ Correct",
      value: overallStats.correct,
      progress: (overallStats.correct / overallStats?.total).toFixed(2) * 100,
    },
    {
      label: "❌ Incorrect",
      value: overallStats.incorrect,
      progress: (overallStats.incorrect / overallStats?.total).toFixed(2) * 100,
    },
    {
      label: "🎯 Accuracy",
      value: overallStats?.total
        ? ((overallStats.correct / overallStats?.total) * 100).toFixed(2)
        : 0,
      progress: overallStats?.total
        ? ((overallStats.correct / overallStats?.total) * 100).toFixed(2)
        : 0,
    },
  ];

  return (
    <motion.div
      className="py-8 px-4 bg-white rounded-2xl shadow-2xl border border-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <h2
        className="text-3xl font-extrabold mb-8 flex items-center gap-2"
        style={{ color: colors.accent }}
      >
        📊 Overall Progress
      </h2>

      <div className="space-y-8">
        {stats.map((stat, index) => {
          const barColor = [
            colors.primary,
            colors.secondary,
            colors.accent,
            colors.success,
          ][index % 4];

          if (stat.label === "📋 Total Questions") {
            return (
              <div
                key={index}
                className="flex justify-between items-center border-x-0 border-3 py-2 border-gray-400"
              >
                <span className="text-sm text-gray-500 font-medium uppercase tracking-wide">
                  {stat.label}
                </span>
                <span
                  className={`font-semibold text-lg`}
                  style={{ color: barColor }}
                >
                  {stat.value}
                </span>
              </div>
            );
          }

          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 font-medium uppercase tracking-wide">
                  {stat.label}
                </span>
                <span
                  className={`font-semibold text-lg`}
                  style={{ color: barColor }}
                >
                  {stat.value}
                </span>
              </div>
              {
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden relative group">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${stat.progress}%`,
                    }}
                    transition={{
                      duration: 0.8,
                    }}
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: barColor,
                    }}
                  />
                </div>
              }
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default DashboardProgress;
