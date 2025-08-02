import React, { useEffect, useState } from "react";
import { leaderBoard } from "../../services/auth";
import { motion } from "framer-motion";
import { Crown, Trophy, User2 } from "lucide-react";

const LeaderBoard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getLeaderboard = async () => {
      const response = await leaderBoard();
      setData(response);
    };
    getLeaderboard();
  }, []);

  if (!data)
    return <div className="text-center p-8">Loading Leaderboard...</div>;

  const { leaderboard, current_user } = data;

  return (
    <div className="p-4 md:p-8 bg-white min-h-screen flex flex-col gap-6 mb-12">
      <h2 className="text-2xl font-bold text-center mb-4">🏆 Leaderboard</h2>

      <div className="space-y-4">
        {leaderboard.map((entry) => {
          const isTop3 = entry.rank <= 3;
          const isCurrentUser =
            current_user?.student_name === entry.student_name;

          let baseClass =
            "flex items-center justify-between rounded-xl px-4 py-3 shadow-md border transition-transform ";

          if (isCurrentUser) baseClass += "scale-105";

          let bgClass = "";
          if (entry.rank === 1) {
            bgClass =
              "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border-yellow-300";
          } else if (entry.rank === 2) {
            bgClass =
              "bg-gradient-to-r from-gray-400 to-gray-600 text-white border-gray-300";
          } else if (entry.rank === 3) {
            bgClass =
              "bg-gradient-to-r from-orange-400 to-orange-600 text-white border-orange-300";
          } else if (isCurrentUser) {
            bgClass =
              "bg-gradient-to-r from-indigo-400 to-blue-500 text-white border-blue-300 ";
          } else {
            bgClass = "bg-white border-gray-200";
          }

          return (
            <motion.div
              key={entry.rank}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: entry.rank * 0.05 }}
              className={`${baseClass} ${bgClass}`}
            >
              <div className="flex items-center gap-3">
                {isTop3 ? (
                  <div className="p-2 bg-black rounded-full">
                    <Crown
                      className="w-6 h-6"
                      strokeWidth={2}
                      color="white"
                      fill="white"
                    />
                  </div>
                ) : (
                  <span className="font-semibold text-white h-10  w-10 flex justify-center items-center p-2 bg-black rounded-full text-center">
                    {entry.rank}
                  </span>
                )}
                <div className="font-medium text-sm md:text-base">
                  {entry.student_name}
                  <div className="text-xs text-black">Grade {entry.grade}</div>
                </div>
              </div>
              <div className="font-bold text-sm md:text-base">
                ✅ {entry.total_correct} points
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Persistent Current User Banner */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed bottom-4 left-4 right-4 md:left-8 md:right-8 bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 text-white shadow-xl rounded-2xl px-6 py-5 flex items-center justify-between z-50 border border-white/30 backdrop-blur-sm"
      >
        <div className="flex items-center gap-4 w-full">
          <div className="bg-black p-2 rounded-full">
            <Trophy className="w-6 h-6 text-yellow-200" />
          </div>
          <div className="text-2xl font-extrabold tracking-wide leading-snug flex justify-between items-center w-full">
            <div className=" ">{current_user.student_name}</div>
            <div className=" ">
              Rank <span>#{current_user.rank}</span> • Grade{" "}
              <span>{current_user.grade}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LeaderBoard;
