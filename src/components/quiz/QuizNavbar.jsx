import React from "react";
import useStore from "../../store/store";
import { useNavigate } from "react-router-dom";
import FeedbackDropdown from "./FeedbackDropdown";

const QuizNavbar = ({ type }) => {
	const navigate = useNavigate();

	const grade = useStore((state) => state.user.grade);
	const selectedSubject = useStore((state) => state.selectedSubject);
	return (
		<div className="animate-fadeIn ">
			<div className="mb-4 flex justify-between bg-white bg-opacity-90 px-4 py-3 rounded-2xl items-center shadow-lg border-4 border-yellow-300">
				<div className=" text-sm capitalize bg-gradient-to-r from-purple-500 to-pink-500 py-2 px-4 rounded-full text-white font-bold shadow-md">
					Grade {grade} | {selectedSubject}
				</div>

				<div className="text-3xl bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-bold">
					{type}
				</div>
				<FeedbackDropdown />
				<button
					onClick={() => navigate("/dashboard")}
					className="bg-white hover:bg-red-50 shadow h-8 px-3 text-xs hover:text-red-600 rounded-full font-bold transition-all transform hover:scale-105"
				>
					Exit Quiz
				</button>
			</div>
		</div>
	);
};

export default QuizNavbar;
