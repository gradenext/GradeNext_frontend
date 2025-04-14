import React from "react";

const LevelProgess = ({ questionsInCurrentLevel, correctInCurrentLevel }) => {
	return (
		<div className="flex items-center gap-2 mb-4">
			<div className="text-sm text-gray-900">Level Progress:</div>
			<div className="flex gap-x-1">
				{[...Array(5)].map((_, index) => {
					const hasIncorrect =
						questionsInCurrentLevel > correctInCurrentLevel;
					const isAfterIncorrect =
						hasIncorrect && index > correctInCurrentLevel;

					return (
						<div
							key={index}
							className={`w-4 h-4 rounded-full ${
								index < questionsInCurrentLevel
									? isAfterIncorrect
										? "bg-gray-200"
										: index < correctInCurrentLevel
										? "bg-green-500"
										: "bg-red-500"
									: "bg-gray-200"
							}`}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default LevelProgess;
