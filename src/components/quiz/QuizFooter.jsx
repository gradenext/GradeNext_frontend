import React from "react";
import useStore from "../../store/store";
import { Loader, SpeakerIcon } from "lucide-react";

export const QuestionFooter = ({
  showHint,
  showExplanation,
  onContinue,
  speakText,
  stopSpeaking,
  isSpeaking,
}) => {
  const { hint } = useStore((state) => state?.quizQuestion);
  const { explanation } = useStore((state) => state?.quizQuestion);
  const isSubmitting = useStore((state) => state?.isSubmitting);

  return (
    <>
      {showHint && (
        <div className="my-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
          <div className="text-blue-800">
            <div className="flex justify-between items-center">
              <strong>Hint:</strong>
              {hint && (
                <button
                  onClick={() =>
                    isSpeaking.hint ? stopSpeaking() : speakText(hint, "hint")
                  }
                  className="flex items-center gap-1 px-2 py-1 text-xs sm:text-sm border border-blue-300 bg-blue-100 hover:bg-blue-200 rounded-md text-blue-800"
                >
                  <SpeakerIcon className="w-4 h-4" />
                  {isSpeaking.hint ? "Stop" : "Read Aloud"}
                </button>
              )}
            </div>
            <span dangerouslySetInnerHTML={{ __html: hint }} />
          </div>
        </div>
      )}

      {showExplanation && (
        <div className="p-2 bg-blue-50 border border-blue-200 rounded-md">
          <div className="text-blue-800">
            <div className="flex justify-between items-center">
              <strong>Explanation:</strong>
              {explanation && (
                <button
                  onClick={() =>
                    isSpeaking.explanation
                      ? stopSpeaking()
                      : speakText(explanation, "explanation")
                  }
                  className="flex items-center gap-1 px-2 py-1 text-xs sm:text-sm border border-blue-300 bg-blue-100 hover:bg-blue-200 rounded-md text-blue-800"
                >
                  <SpeakerIcon className="w-4 h-4" />
                  {isSpeaking.explanation ? "Stop" : "Read Aloud"}
                </button>
              )}
            </div>
            <div dangerouslySetInnerHTML={{ __html: explanation }} />
            <button
              className={`mt-2 px-4 py-2 w-1/3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"}`}
              onClick={onContinue}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader className="mx-auto animate-spin" />
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
