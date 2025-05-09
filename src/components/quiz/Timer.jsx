import React, { useEffect, useRef } from "react";
import { useTimer } from "react-timer-hook";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useStore from "../../store/store";

const Timer = () => {
  const setExitModal = useStore((state) => state.setExitModal);
  const expiryTime = useStore((state) => state.expiryTime);
  const setExpiryTime = useStore((state) => state.setExpiryTime);

  const beepRef = useRef(new Audio("/beep.mp3"));
  const warned = useRef(false);

  const getExpiryTime = () => {
    if (expiryTime) return new Date(expiryTime);
    const newTime = new Date();
    newTime.setMinutes(newTime.getMinutes() + 30);
    setExpiryTime(newTime.toISOString());
    return newTime;
  };

  const { seconds, minutes } = useTimer({
    expiryTimestamp: getExpiryTime(),
    onExpire: () => {
      setExitModal(true, true);
    },
  });

  // 🔔 Beep when under 1 min left
  useEffect(() => {
    if (minutes === 4 && seconds <= 59 && !warned.current) {
      beepRef.current.play().catch(() => {});
      warned.current = true;
    }
  }, [minutes, seconds]);

  const maxTime = 30 * 60;
  const remaining = minutes * 60 + seconds;
  const percentage = (remaining / maxTime) * 100;

  return (
    <div className="w-fit">
      <div className="w-16 h-16 mx-auto my-2">
        <CircularProgressbar
          value={percentage}
          text={`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
          styles={buildStyles({
            textColor: "#1D4ED8",
            pathColor: "#1D4ED8",
            trailColor: "#E5E7EB",
            textSize: "24px",
          })}
        />
      </div>
    </div>
  );
};

export default Timer;
