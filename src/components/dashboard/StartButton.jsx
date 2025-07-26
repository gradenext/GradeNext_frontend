import { motion, AnimatePresence } from "framer-motion";
import useStore from "../../store/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { colors } from "../../constants/color";
import { startSession } from "../../services/auth";
import { Sparkles } from "lucide-react";

const StartButton = () => {
  const navigate = useNavigate();
  const plan = useStore((state) => state.user.subscription.plan);
  const setSession = useStore((state) => state.setSession);
  const selectedSubject = useStore((state) => state.selectedSubject);
  const selectedMode = useStore((state) => state.selectedMode);
  const toogleShowUpgradeModal = useStore(
    (state) => state.toogleShowUpgradeModal
  );
  const { generateQuestion } = useStore();

  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    if (!selectedSubject || !selectedMode) return;

    if (
      plan === "basic" &&
      (selectedMode === "revision" || selectedMode === "topic")
    ) {
      toogleShowUpgradeModal(true);
      return;
    }

    if (plan === "pro" && selectedMode === "topic") {
      toogleShowUpgradeModal(true);
      return;
    }

    try {
      setLoading(true);
      const id = await startSession();
      setSession(id);
      if (selectedMode === "topic") {
        navigate(`/treasurehunt/topics/${selectedSubject}`);
        return;
      } else {
        await generateQuestion();
        navigate(`/${selectedMode}/${id}`);
      }
    } catch (error) {
      console.log("Error Occured", error);
      if (
        error.response.data?.non_field_errors[0] ||
        error.response.data?.details
      )
        toast.error(
          error.response.data?.non_field_errors[0] ||
            error.response.data?.details
        );
      else toast.error("Oops!! Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="sticky top-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <button
        onClick={handleStart}
        disabled={!selectedSubject || !selectedMode || loading}
        className={`w-full py-5 text-xl font-bold rounded-2xl transition-all 
                  ${
                    selectedSubject && selectedMode
                      ? "hover:scale-105 shadow-xl"
                      : "opacity-50 cursor-not-allowed"
                  }
                  relative cursor-pointer overflow-hidden`}
        style={{
          backgroundColor: colors.primary,
          color: "white",
        }}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 1,
              }}
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
            Starting Adventure...
          </div>
        ) : (
          <>
            🚀 Let's Learn! 🌟
            <AnimatePresence>
              {selectedSubject && selectedMode && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 bg-white/20"
                />
              )}
            </AnimatePresence>
          </>
        )}
      </button>
    </motion.div>
  );
};

export default StartButton;
