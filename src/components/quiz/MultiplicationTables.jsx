import React, { useState } from "react";

const MultiplicationTables = () => {
  const [selectedNumber, setSelectedNumber] = useState(2);

  return (
    <div className="text-center">
      <h3 className="text-xl font-bold text-blue-700 mb-4">
        Multiplication Table of {selectedNumber}
      </h3>

      <select
        value={selectedNumber}
        onChange={(e) => setSelectedNumber(parseInt(e.target.value))}
        className="text-lg font-bold px-4 py-2 mb-4 rounded-full border border-blue-400 shadow-md"
      >
        {[...Array(25)].map((_, i) => (
          <option key={i} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="bg-yellow-100 border border-yellow-400 text-purple-800 font-semibold text-lg rounded-xl p-3 shadow-md"
          >
            {selectedNumber} × {i + 1} ={" "}
            <span className="font-bold text-blue-800">
              {selectedNumber * (i + 1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiplicationTables;
