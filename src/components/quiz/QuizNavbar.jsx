import React from "react";
import useStore from "../../store/store";
import FeedbackDropdown from "./FeedbackDropdown";
import Caclulator from "./Calculator";
import { useNavigate } from "react-router-dom";

const QuizNavbar = () => {
	const grade = useStore((state) => state.user.grade);
	const selectedSubject = useStore((state) => state.selectedSubject);
	const selectedMode = useStore((state) => state.selectedMode);
	const selectedTopic = useStore((state) => state.selectedTopic);
	const { exitQuiz } = useStore();
	const navigate = useNavigate();
	return (
		<div className="animate-fadeIn my-2  ">
			<div className="mb-4 flex justify-between bg-white bg-opacity-90 px-4 py-3 rounded-2xl items-center shadow-lg border-4 border-yellow-300">
				<div className=" text-sm capitalize bg-blue-500 py-2 px-4 rounded-full text-white font-bold shadow-md">
					<span className="uppercase">
						Grade {grade} | {selectedSubject}
					</span>
				</div>

				<div className="text-3xl bg-blue-500 uppercase bg-clip-text text-transparent font-bold">
					{selectedMode === "topic" ? selectedTopic?.topic_name : selectedMode}
				</div>
				<div className="relative flex items-center justify-center gap-x-2">
					<Caclulator />
					<FeedbackDropdown />
					<button
						onClick={() => {
							exitQuiz();
							navigate("/dashboard");
						}}
						className="text-sm capitalize text-blue-500 py-2 px-4 rounded-full bg-white hover:bg-slate-200 font-bold shadow-md  cursor-pointer transition-all duration-300 border border-blue-500"
					>
						Exit Quiz
					</button>
				</div>
			</div>
		</div>
	);
};

export default QuizNavbar;
