import React, { useState } from "react";
import useStore from "../store/store";
import { GRADE_TOPICS, TOPIC_FORMULAS, TOPIC_EXAMPLES } from "../constants/formulas";

const bgColors = [
  "bg-red-100", "bg-green-100", "bg-blue-100", "bg-yellow-100",
  "bg-purple-100", "bg-pink-100", "bg-teal-100", "bg-orange-100"
];

const FormulaViewer = () => {
  const grade = useStore((state) => state.user.grade);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});

  const topics = GRADE_TOPICS[grade] || [];

  const handleCardToggle = (index) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md border border-gray-300 p-6">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          📘 Grade {grade} Math Formulas
        </h2>

        {/* Topic Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {topics.map((topic) => (
            <button
              key={topic.key}
              onClick={() => {
                setSelectedTopic(topic.key);
                setExpandedCards({});
              }}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${selectedTopic === topic.key
                  ? "bg-blue-500 text-white"
                  : "bg-yellow-200 text-blue-900 hover:bg-yellow-300"
                }`}
            >
              {topic.name}
            </button>
          ))}
        </div>

        {/* Flashcards */}
        {selectedTopic && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {(TOPIC_FORMULAS[selectedTopic] || []).map((formula, idx) => {
              const isExpanded = expandedCards[idx];
              const hasExample = TOPIC_EXAMPLES[selectedTopic] && TOPIC_EXAMPLES[selectedTopic][idx];
              const bg = bgColors[idx % bgColors.length];

              return (
                <div
                  key={idx}
                  className={`rounded-2xl shadow-lg border border-blue-200 p-4 transition-transform duration-300 hover:scale-[1.02] cursor-pointer ${bg}`}
                  onClick={() => hasExample && handleCardToggle(idx)}
                >
                  <div className="text-blue-900 space-y-2">
                    <h4 className="text-md font-bold">📌 Formula:</h4>
                    <p className="text-sm">{formula}</p>

                    {!isExpanded && hasExample && (
                      <p className="text-sm font-semibold text-gray-700 mt-2">
                        👉 Tap to see example
                      </p>
                    )}

                    {isExpanded && hasExample && (
                      <div className="mt-3 text-sm text-blue-900">
                        <hr className="border-blue-300 mb-2" />
                        <h4 className="font-bold text-blue-800 mb-1">🧠 Example</h4>
                        <div className="space-y-2">
                          <p className="text-purple-800 font-semibold">❓ Question:</p>
                          <p>{TOPIC_EXAMPLES[selectedTopic][idx].question}</p>
                          <p className="text-green-800 font-semibold mt-2">✅ Solution:</p>
                          <p>{TOPIC_EXAMPLES[selectedTopic][idx].solution}</p>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardToggle(idx);
                          }}
                          className="mt-3 text-xs font-semibold bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Close
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default FormulaViewer;
