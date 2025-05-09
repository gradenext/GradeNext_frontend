import React from "react";
import useStore from "../../store/store";
import { Loader } from "lucide-react";

export const QuestionFooter = ({ showHint, showExplanation, onContinue }) => {
	const { hint } = useStore((state) => state?.quizQuestion);
	const { explanation } = useStore((state) => state?.quizQuestion);
	const isSubmitting = useStore((state) => state?.isSubmitting);

	return (
		<>
			{showHint && (
				<div className="my-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
					<div className=" text-blue-800">
						<strong>Hint:</strong>{" "}
						<span dangerouslySetInnerHTML={{ __html: hint }} />
					</div>
				</div>
			)}

			{showExplanation && (
				<div className=" p-2 bg-blue-50 border border-blue-200 rounded-md">
					<div className=" text-blue-800">
						<strong>Explanation:</strong>{" "}
						<div
							dangerouslySetInnerHTML={{ __html: explanation }}
						/>
						<button
							className={`mt-2 px-4 py-2 w-1/3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
							${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"}
							`}
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
