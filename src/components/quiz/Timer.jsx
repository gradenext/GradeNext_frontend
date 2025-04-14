import React from "react";
import { useTimer } from "react-timer-hook";

const Timer = () => {
	const time = new Date();
	time.setMinutes(time.getMinutes() + 30);

	const { seconds, minutes, start, pause, resume, restart } = useTimer({
		expiryTimestamp: time,
		onExpire: () => console.warn("Timer expired!"),
	});
	return (
		<div className="text-blue-500 font-bold text-xl">
			Time: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
		</div>
	);
};

export default Timer;
