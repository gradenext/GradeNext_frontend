// src/components/GlossaryModal.jsx
import React, { useState } from "react";
import { X } from "lucide-react";
import useStore from "../../store/store"; // Ensure this path is correct
import FormulaViewer from "../FormulaViewer.jsx";

const GlossaryModal = ({ onClose }) => {
  const selectedSubject = useStore((state) => state.selectedSubject);
  const isMath = selectedSubject?.toLowerCase() === "mathematics";

  const [activeTab, setActiveTab] = useState("formulas"); // default

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-6">
      <div className="bg-white rounded-3xl w-full max-w-4xl h-[90vh] shadow-xl border-4 border-yellow-400 flex flex-col relative overflow-hidden animate-fadeIn">

        {/* Header */}
        <div className="flex justify-between items-center bg-yellow-300 px-4 py-3 rounded-t-3xl border-b-2 border-yellow-500">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-900">📖 Glossary</h2>
          <button onClick={onClose} className="text-blue-800 hover:text-red-500 transition-all cursor-pointer">
            <X size={28} />
          </button>
        </div>

        {/* Tabs — only for Mathematics */}
        {isMath && (
          <div className="flex  justify-center gap-4 bg-yellow-100 px-4 py-2 text-blue-900 font-semibold text-sm sm:text-base">
            <button
              onClick={() => setActiveTab("formulas")}
              className={`px-3 py-1 rounded-full transition-all ${
                activeTab === "formulas"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-200"
              }`}
            >
              📚 Formulas
            </button>
            <button
              onClick={() => setActiveTab("tables")}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                activeTab === "tables"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-200"
              }`}
            >
              ✖️ Tables
            </button>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 bg-blue-50">
          {isMath ? (
            activeTab === "formulas" ? (
              <FormulaViewer />
            ) : (
              <div className="text-center text-blue-800">
                <h3 className="text-lg font-bold mb-2">Multiplication Tables (1–25)</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm sm:text-base max-h-[60vh] overflow-y-auto">
                  {Array.from({ length: 25 }, (_, i) => (
                    <div
                      key={i + 1}
                      className="bg-white p-2 rounded-xl shadow border border-blue-300"
                    >
                      <h4 className="font-bold text-blue-700 text-center mb-1">Table of {i + 1}</h4>
                      <ul className="text-left space-y-0.5">
                        {Array.from({ length: 10 }, (_, j) => (
                          <li key={j}>
                            {i + 1} × {j + 1} = {(i + 1) * (j + 1)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )
          ) : (
            <div className="text-center text-gray-600 italic text-sm mt-4">
              Glossary content for <b>{selectedSubject}</b> will be added soon!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlossaryModal;
