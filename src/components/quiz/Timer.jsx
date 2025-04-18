import React from "react";
import { useTimer } from "react-timer-hook";
import useStore from "../../store/store";
import { useNavigate } from "react-router-dom";

const Timer = () => {
	const time = new Date();
	time.setMinutes(time.getMinutes() + 30);
	const exitQuiz = useStore((state) => state.exitQuiz);
	const navigate = useNavigate();

	const { seconds, minutes, start, pause, resume, restart } = useTimer({
		expiryTimestamp: time,
		onExpire: () => {
			exitQuiz();
			navigate("/dashboard");
		},
	});
	return (
		<div className="text-blue-500 font-bold text-xl">
			Time: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
		</div>
	);
};

export default Timer;
