import { motion } from "framer-motion";
import { colors } from "../../constants/color";
import { Clock, Gem, Puzzle } from "lucide-react";
import useStore from "../../store/store";

const actions = [
  {
    id: "practice",
    label: "Practice Quest",
    icon: <Puzzle className="w-10 h-10" />,
    color: colors.secondary,
    emoji: "🕹️",
  },
  {
    id: "revision",
    label: "Time Travel",
    icon: <Clock className="w-10 h-10" />,
    color: colors.success,
    emoji: "⏳🌀",
  },
  {
    id: "topic",
    label: "Treasure Hunt",
    icon: <Gem className="w-10 h-10" />,
    color: colors.primary,
    emoji: "🏴‍☠️💎",
  },
];

function isFridayOrSaturday() {
  const today = new Date();
  const day = today.getDay(); // 0 = Sunday, 5 = Friday, 6 = Saturday
  return day === 5 || day === 6;
}

const DashboardActivity = () => {
  const selectedMode = useStore((state) => state.selectedMode);
  const { setSelectedMode } = useStore();
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <h2
        className="text-2xl font-bold"
        style={{
          color: colors.secondary,
        }}
      >
        🎮 Learning Activities
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action) => (
          <motion.div
            key={action.id}
            whileHover={{
              scale:
                !isFridayOrSaturday() && action.id === "revision" ? 1 : 1.05,
            }}
            whileTap={{
              scale:
                !isFridayOrSaturday() && action.id === "revision" ? 1 : 0.95,
            }}
            className={`p-6 rounded-2xl transition-all relative ${
              !isFridayOrSaturday() && action.id === "revision"
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            } ${
              selectedMode === action.id
                ? "ring-4 shadow-xl"
                : "shadow-lg hover:shadow-xl"
            }`}
            style={{
              backgroundColor:
                selectedMode === action.id ? `${action.color}20` : "white",
              borderColor: action.color,
              pointerEvents:
                !isFridayOrSaturday() && action.id === "revision"
                  ? "none"
                  : "auto",
            }}
            onClick={() =>
              !isFridayOrSaturday() && action.id === "revision"
                ? null
                : setSelectedMode(action.id)
            }
          >
            <div className="flex flex-col items-center gap-3">
              <div
                className="p-3 rounded-xl"
                style={{
                  backgroundColor: `${action.color}20`,
                }}
              >
                {action.icon}
              </div>
              <h3
                className="text-xl font-bold text-center"
                style={{ color: action.color }}
              >
                {action.label}
              </h3>
              <p className="text-lg">{action.emoji}</p>
            </div>

            {!isFridayOrSaturday() && action.id === "revision" && (
              <div className="absolute inset-0  flex items-end justify-center p-2 bg-black/50 rounded-2xl ">
                <p className="text-sm text-white bg-black font-medium w-2/3 text-center px-1 py-2 rounded-2xl">
                  Available only on Fridays and Saturdays
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DashboardActivity;
