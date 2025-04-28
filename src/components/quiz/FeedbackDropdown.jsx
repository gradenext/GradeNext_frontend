import React, { useState, useRef, useEffect } from "react";
import useStore from "../../store/store";
import { X } from "lucide-react";
import Modal from "../Modal";

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
	const { setFeedBack } = useStore();
	const [isOpen, setIsOpen] = useState(false);
	const [selectedFeedback, setSelectedFeedback] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const modalRef = useRef(null);

	// Close modal when clicking outside or pressing Escape
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		const handleEscape = (event) => {
			if (event.key === "Escape") {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
			document.addEventListener("keydown", handleEscape);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscape);
		};
	}, [isOpen]);

	const handleSubmit = () => {
		if (selectedFeedback) {
			setFeedBack(selectedFeedback);
			setSubmitted(true);
			setIsOpen(false);
			setTimeout(() => setSubmitted(false), 3000);
		}
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

			{/* Success Notification */}
			{submitted && (
				<div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 p-3 sm:p-4 bg-green-100 text-green-800 rounded-lg shadow-md transition-opacity duration-300 text-sm sm:text-base max-w-xs sm:max-w-md">
					Thank you for your feedback! We'll review this question.
				</div>
			)}
		</>
	);
};

export default FeedbackModal;
