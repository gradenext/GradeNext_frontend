import React from "react";

const QuestionFeedback = ({
	showHint,
	showExplanation,
	hint,
	explanation,
	onContinue,
}) => {
	return (
		<>
			{showHint && (
				<div className="mt-4 p-4 border border-gray-300 rounded bg-gray-100">
					<p>
						<strong>Hint:</strong>{" "}
						<span dangerouslySetInnerHTML={{ __html: hint }} />
					</p>
				</div>
			)}

			{showExplanation && (
				<div className="mt-4 p-4 border border-gray-300 rounded bg-gray-100">
					<p>
						<strong>Explanation:</strong>
					</p>
					<div dangerouslySetInnerHTML={{ __html: explanation }} />
					<button
						className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
						onClick={onContinue}
					>
						Continue
					</button>
				</div>
			)}
		</>
	);
};

export default QuestionFeedback;
