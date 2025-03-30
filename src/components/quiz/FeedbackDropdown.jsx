import React, { useState } from "react";
import useStore from "../../store/store";

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

const FeedbackDropdown = () => {
	const { setFeedBack } = useStore();

	const [isOpen, setIsOpen] = useState(false);
	const [selectedFeedback, setSelectedFeedback] = useState("");
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = () => {
		if (selectedFeedback) {
			setFeedBack(selectedFeedback);
			setSubmitted(true);
			setIsOpen(false);
			setTimeout(() => setSubmitted(false), 3000);
		}
	};

	return (
		<div className="navbar-dropdown-container">
			<button
				className="navbar-button"
				onClick={() => setIsOpen(!isOpen)}
			>
				Report Issue
			</button>

			{isOpen && (
				<div className="dropdown-menu">
					<div className="dropdown-content">
						{FEEDBACK_OPTIONS.map((option) => (
							<div
								key={option.value}
								className={`dropdown-item ${
									selectedFeedback === option.value
										? "selected"
										: ""
								}`}
								onClick={() =>
									setSelectedFeedback(option.value)
								}
							>
								{option.label}
							</div>
						))}

						<button
							className="submit-button"
							onClick={handleSubmit}
							disabled={!selectedFeedback}
						>
							Submit Feedback
						</button>
					</div>
				</div>
			)}

			{submitted && (
				<div className="success-message">
					Thank you for your feedback! We'll review this question.
				</div>
			)}

			<style jsx>{`
				.navbar-dropdown-container {
					position: relative;
					display: inline-block;
				}

				.navbar-button {
					padding: 8px 16px;
					background: #3b82f6;
					color: white;
					border: none;
					border-radius: 4px;
					cursor: pointer;
					font-size: 14px;
				}

				.dropdown-menu {
					position: absolute;
					top: 100%;
					left: 0;
					margin-top: 8px;
					min-width: 300px;
					background: white;
					border: 1px solid #e5e7eb;
					border-radius: 6px;
					box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
					z-index: 100;
				}

				.dropdown-content {
					padding: 8px;
				}

				.dropdown-item {
					padding: 8px;
					cursor: pointer;
					border-radius: 4px;
					margin: 2px 0;
				}

				.dropdown-item:hover {
					background: #f3f4f6;
				}

				.dropdown-item.selected {
					background: #eff6ff;
				}

				.submit-button {
					width: 100%;
					margin-top: 8px;
					padding: 8px;
					background: #10b981;
					color: white;
					border: none;
					border-radius: 4px;
					cursor: pointer;
				}

				.submit-button:disabled {
					background: #6b7280;
					cursor: not-allowed;
				}

				.success-message {
					position: fixed;
					bottom: 20px;
					right: 20px;
					padding: 12px;
					background: #d1fae5;
					color: #065f46;
					border-radius: 4px;
					box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
				}
			`}</style>
		</div>
	);
};

export default FeedbackDropdown;
