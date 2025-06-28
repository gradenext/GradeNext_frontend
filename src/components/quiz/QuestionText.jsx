import ReadAloud from "./ReadAloud";
import QuestionImage from "./QuestionImage";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { motion } from "framer-motion";

const QuestionText = ({ question }) => {
  return (
    <motion.div
      className="flex-1 min-h-[20vh] overflow-y-auto bg-gradient-to-r from-purple-50 to-blue-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-purple-100 sm:border-2 sm:border-purple-200"
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {question?.image_generated && question?.image_url && (
        <QuestionImage
          imageUrl={question.image_url}
          alt="Question Illustration"
        />
      )}

      <div className="text-lg sm:text-xl font-bold text-purple-800">
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
          {question?.question}
        </ReactMarkdown>
        <div className="flex justify-end mb-2">
          <ReadAloud
            place={"question"}
            text={question?.question?.replace(/<\/?[^>]+(>|$)/g, "")}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionText;
