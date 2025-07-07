import { Volume2, VolumeOff } from "lucide-react";
import React, { useState } from "react";

const ReadAloud = ({ place, text }) => {
  const [isSpeaking, setIsSpeaking] = useState({
    question: false,
    hint: false,
    explanation: false,
    topicName: false,
    topicIntro: false,
    topicConcepts: false,
    topicExamples: false,
  });

  const initialState = {
    question: false,
    hint: false,
    explanation: false,
    topicName: false,
    topicIntro: false,
    topicConcepts: false,
    topicExamples: false,
  };

  // Stop all ongoing speech and reset state
  const stopAllSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking({ ...initialState });
  };

  const speakText = (text, place) => {
    if (!window.speechSynthesis) return;

    stopAllSpeaking();

    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.rate = 0.65;

    utterance.onstart = () =>
      setIsSpeaking(() => ({ ...initialState, [place]: true }));

    utterance.onend = () => setIsSpeaking(() => ({ ...initialState }));

    utterance.onerror = () => setIsSpeaking(() => ({ ...initialState }));

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <button
        onClick={() =>
          isSpeaking[place] ? stopAllSpeaking() : speakText(text, place)
        }
        className="flex items-center gap-1 px-2 py-1 text-xs sm:text-sm border border-blue-300 bg-blue-100 hover:bg-blue-200 rounded-md text-blue-800 cursor-pointer transition-colors duration-200"
      >
        {isSpeaking[place] ? (
          <div className="flex justify-center items-center gap-x-2">
            <VolumeOff className="w-3 h-3" />
            Stop
          </div>
        ) : (
          <div className="flex justify-center items-center gap-x-2">
            <Volume2 className="w-3 h-3" />
            Read Aloud
          </div>
        )}
      </button>
    </div>
  );
};

export default ReadAloud;
