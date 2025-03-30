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
		<div className="text-lg font-bold">
			Time: {minutes}:{seconds}
		</div>
	);
};

export default Timer;
