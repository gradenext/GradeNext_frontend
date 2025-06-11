import React, { useState } from "react";
import emailjs from "emailjs-com";
import Modal from "../Modal";
import useStore from "../../store/store";
import toast from "react-hot-toast";

const FEEDBACK_OPTIONS = [
  {
    value: "no_correct_answer",
    label: "None of the options match the correct answer",
  },
  {
    value: "explanation_mismatch",
    label: "Explanation doesn't match the correct answer",
  },
  { value: "hint_unclear", label: "Hint is unclear or unhelpful" },
  { value: "question_unclear", label: "Question is unclear or confusing" },
  { value: "multiple_correct", label: "Multiple answers seem correct" },
  { value: "other", label: "Other issue" },
];

const FeedbackModal = () => {
  const question = useStore((state) => state.quizQuestion);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = () => {
    if (!selectedFeedback) return;

    const templateParams = {
      issuefaced: selectedFeedback,
      question_text: question.question,
      option_0: question.options[0],
      option_1: question.options[1],
      option_2: question.options[2],
      option_3: question.options[3],
      hint: question.hint,
      explanation: question.explanation,
    };

    emailjs
      .send(
        "service_mo597zf",
        "template_uzl8dzv",
        templateParams,
        "lm8671wRuXNu8poP5"
      )
      .then(() => {
        setIsOpen(false);
        setSelectedFeedback("");
        setShowConfirmation(true);
        toast.success("Feedback submitted!!");
        setTimeout(() => {
          setShowConfirmation(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        toast.error("Oops!! Something went wrong");
      });
  };

  return (
    <>
      <button
        className="text-sm xs:text-base capitalize bg-blue-500 py-1 px-3 sm:py-2 sm:px-4 rounded-full text-white font-bold shadow-md relative cursor-pointer hover:bg-blue-600 transition-colors whitespace-nowrap"
        onClick={() => setIsOpen(true)}
      >
        Report Issue
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={"Report an Issue"}
      >
        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
          {FEEDBACK_OPTIONS.map((option) => (
            <div
              key={option.value}
              className={`p-3 sm:p-4 cursor-pointer rounded-lg border transition-all text-sm sm:text-base ${
                selectedFeedback === option.value
                  ? "bg-blue-50 border-blue-200"
                  : "border-transparent hover:bg-gray-50"
              }`}
              onClick={() => setSelectedFeedback(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 sm:gap-3">
          <button
            className="px-3 py-1 sm:px-4 sm:py-2 text-gray-600 hover:text-gray-800 rounded-lg transition-colors cursor-pointer text-sm sm:text-base"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-white transition-colors text-sm sm:text-base ${
              selectedFeedback
                ? "bg-green-500 hover:bg-green-600 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={handleSubmit}
            disabled={!selectedFeedback}
          >
            Submit Feedback
          </button>
        </div>
      </Modal>

      {showConfirmation && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-300 text-green-700 px-4 py-2 rounded-lg shadow-md transition-opacity duration-300 z-50">
          ✅ Thank you! Your feedback has been submitted.
        </div>
      )}
    </>
  );
};

export default FeedbackModal;
