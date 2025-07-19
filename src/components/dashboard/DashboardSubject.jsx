import { motion } from "framer-motion";
import { useState } from "react";
import { colors } from "../../constants/color";
import useStore from "../../store/store";
import { Calculator, FlaskConical, Languages, Laptop } from "lucide-react";

const subjects = [
  {
    id: "mathematics",
    label: "Math Adventure",
    icon: <Calculator className="w-12 h-12" />,
    color: colors.success,
    emoji: "🧮✨",
  },
  {
    id: "english",
    label: "English Language Art",
    icon: <Languages className="w-12 h-12" />,
    color: colors.accent,
    emoji: "📚🌈",
  },
  {
    id: "science",
    label: "Science Exploration",
    icon: <FlaskConical className="w-12 h-12" />,
    color: colors.secondary,
    emoji: "🧪🔬",
  },
  {
    id: "programming",
    label: "Code Quest",
    icon: <Laptop className="w-12 h-12" />,
    color: colors.primary,
    emoji: "💻🚀",
  },
];

const DashboardSubject = () => {
  const selectedSubject = useStore((state) => state.selectedSubject);
  const { setSelectedSubject } = useStore();
  const [showProgrammingOverlay, setShowProgrammingOverlay] = useState(false);
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-2xl font-bold text-white">🎯 Choose Your Subject</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subjects.map((subject) => {
          return (
            <motion.div
              key={subject.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-6 rounded-2xl cursor-pointer transition-all ${
                selectedSubject === subject.id
                  ? "ring-4 shadow-xl"
                  : "shadow-lg hover:shadow-xl"
              }`}
              style={{
                backgroundColor:
                  selectedSubject === subject.id
                    ? `${subject.color}20`
                    : "white",
                borderColor: subject.color,
              }}
              onClick={() => {
                if (subject.id === "programming") {
                  setShowProgrammingOverlay(true);
                  setTimeout(() => setShowProgrammingOverlay(false), 2500);
                } else {
                  setSelectedSubject(subject.id);
                }
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="p-3 rounded-xl"
                  style={{
                    backgroundColor: `${subject.color}20`,
                  }}
                >
                  {subject.icon}
                </div>
                <div>
                  <h3
                    className="text-2xl font-bold mb-1"
                    style={{
                      color: subject.color,
                    }}
                  >
                    {subject.label}
                  </h3>
                  <p
                    className="text-lg"
                    style={{
                      color: colors.primary,
                    }}
                  >
                    {subject.emoji}
                  </p>
                </div>
              </div>

              {/* 👇 Overlay for programming card when clicked */}
              {subject.id === "programming" && showProgrammingOverlay && (
                <div className="absolute inset-0 bg-black/70 text-white rounded-2xl flex flex-col items-center justify-center p-4 text-center">
                  <p className="text-base font-semibold">
                    👨‍💻 Computer Coding Quest
                  </p>
                  <p className="text-sm mt-1">
                    This subject is under development!
                  </p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default DashboardSubject;
