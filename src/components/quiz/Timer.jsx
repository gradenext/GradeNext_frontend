import React, { useEffect, useRef } from "react";
import { useTimer } from "react-timer-hook";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import useStore from "../../store/store";

const Timer = () => {
	const navigate = useNavigate();
	const exitQuiz = useStore((state) => state.exitQuiz);
	const STORAGE_KEY = "quiz-expiry-time";

	const beepRef = useRef(new Audio("/beep.mp3"));
	const warned = useRef(false);

	const getExpiryTime = () => {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved) return new Date(saved);
		const newTime = new Date();
		newTime.setMinutes(newTime.getMinutes() + 1);
		localStorage.setItem(STORAGE_KEY, newTime.toISOString());
		return newTime;
	};

	const { seconds, minutes, totalSeconds } = useTimer({
		expiryTimestamp: getExpiryTime(),
		onExpire: () => {
			localStorage.removeItem(STORAGE_KEY);
			exitQuiz();
			navigate("/dashboard");
		},
	});

	// 🔔 Beep when under 1 min left
	useEffect(() => {
		if (minutes === 4 && seconds <= 59 && !warned.current) {
			beepRef.current.play().catch(() => {});
			warned.current = true;
		}

		() => localStorage.removeItem(STORAGE_KEY);
	}, [minutes, seconds]);

	const maxTime = 30 * 60; // 30 minutes in seconds
	const remaining = minutes * 60 + seconds;
	const percentage = (remaining / maxTime) * 100;

	return (
		<div className="w-40 h-40 mx-auto mt-6">
			<CircularProgressbar
				value={percentage}
				text={`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
				styles={buildStyles({
					textColor: "#1D4ED8",
					pathColor: "#1D4ED8",
					trailColor: "#E5E7EB",
					textSize: "18px",
				})}
			/>
			<p className="text-center text-sm mt-2 text-gray-600 font-semibold">
				Time Remaining
			</p>
		</div>
	);
};

export default Timer;
