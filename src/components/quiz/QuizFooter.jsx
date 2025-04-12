import React from "react";
import useStore from "../../store/store";

export const QuestionFooter = ({ showHint, showExplanation, onContinue }) => {
	const { hint } = useStore((state) => state?.quizQuestion);
	const { explanation } = useStore((state) => state?.quizQuestion);

	return (
		<>
			{showHint && (
				<div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
					<div className="text-sm text-blue-800">
						<strong>Hint:</strong>{" "}
						<span dangerouslySetInnerHTML={{ __html: hint }} />
					</div>
				</div>
			)}

			{showExplanation && (
				<div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
					<div className="text-sm text-blue-800">
						<strong>Explanation:</strong>{" "}
						<div
							dangerouslySetInnerHTML={{ __html: explanation }}
						/>
						<button
							className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
							onClick={onContinue}
						>
							Continue
						</button>
					</div>
				</div>
			)}
		</>
	);
};
