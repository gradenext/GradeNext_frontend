import useStore from "../../store/store";
import { Loader } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import ReadAloud from "./ReadAloud";

export const QuestionFooter = ({ showHint, showExplanation, onContinue }) => {
  const { hint } = useStore((state) => state?.quizQuestion);
  const { explanation } = useStore((state) => state?.quizQuestion);
  const isSubmitting = useStore((state) => state?.isSubmitting);

  return (
    <>
      {showHint && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <span className="font-bold text-yellow-800">Hint:</span>
            {hint && <ReadAloud place={"hint"} text={hint} />}
          </div>
          <div className="text-yellow-700">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={{
                table: ({ node, ...props }) => (
                  <table
                    className="w-full border-collapse border border-gray-300 my-4"
                    {...props}
                  />
                ),
                th: ({ node, ...props }) => (
                  <th
                    className="border border-gray-300 px-3 py-2 bg-gray-100 text-center"
                    {...props}
                  />
                ),
                td: ({ node, ...props }) => (
                  <td
                    className="border border-gray-300 px-3 py-2 text-center"
                    {...props}
                  />
                ),
              }}
            >
              {hint}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {showExplanation && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <span className="font-bold text-green-800">Explanation:</span>
            {explanation && (
              <ReadAloud place={"explanation"} text={explanation} />
            )}
          </div>
          <div className="text-green-700 mb-4">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={{
                table: ({ node, ...props }) => (
                  <table
                    className="w-full border-collapse border border-gray-300 my-4"
                    {...props}
                  />
                ),
                th: ({ node, ...props }) => (
                  <th
                    className="border border-gray-300 px-3 py-2 bg-gray-100 text-center"
                    {...props}
                  />
                ),
                td: ({ node, ...props }) => (
                  <td
                    className="border border-gray-300 px-3 py-2 text-center"
                    {...props}
                  />
                ),
              }}
            >
              {explanation}
            </ReactMarkdown>
          </div>
          <button
            onClick={onContinue}
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 cursor-pointer rounded-lg transition-colors disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <Loader className="w-4 h-4 animate-spin" />
                Loading...
              </div>
            ) : (
              "Continue"
            )}
          </button>
        </div>
      )}
    </>
  );
};
