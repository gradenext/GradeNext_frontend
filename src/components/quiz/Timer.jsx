import React, { useEffect, useRef } from "react";
import { useTimer } from "react-timer-hook";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useStore from "../../store/store";

const Timer = () => {
  const setExitModal = useStore((state) => state.setExitModal);
  const STORAGE_KEY = "quiz-expiry-time";

  const beepRef = useRef(new Audio("/beep.mp3"));
  const warned = useRef(false);

  const getExpiryTime = () => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) return new Date(saved);
    const newTime = new Date();
    newTime.setMinutes(newTime.getMinutes() + 30);
    sessionStorage.setItem(STORAGE_KEY, newTime.toISOString());
    return newTime;
  };

  const { seconds, minutes } = useTimer({
    expiryTimestamp: getExpiryTime(),
    onExpire: () => {
      sessionStorage.removeItem(STORAGE_KEY);
      setExitModal(true, true);
    },
  });

  // 🔔 Beep when under 1 min left
  useEffect(() => {
    if (minutes === 4 && seconds <= 59 && !warned.current) {
      beepRef.current.play().catch(() => {});
      warned.current = true;
    }

    () => sessionStorage.removeItem(STORAGE_KEY);
  }, [minutes, seconds]);

  const maxTime = 30 * 60;
  const remaining = minutes * 60 + seconds;
  const percentage = (remaining / maxTime) * 100;

  return (
    <div className="w-fit">
      <div className="w-20 h-20 mx-auto my-2">
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
      </div>
    </div>
  );
};

export default Timer;
