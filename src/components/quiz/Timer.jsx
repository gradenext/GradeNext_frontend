import React, { useEffect, useRef } from "react";
import { useTimer } from "react-timer-hook";
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

  return (
    <div className="flex items-center gap-2 bg-[#FFE5E5] text-red-600 font-bold text-sm sm:text-base px-3 py-1 rounded-xl shadow-inner border border-red-200">
      <span className="text-lg sm:text-xl">⏱️</span>
      <span>
        {`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
      </span>
    </div>
  );
};

export default Timer;
