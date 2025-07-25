import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquareText, Send, FileText } from "lucide-react";
import Modal from "../Modal";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TICKET_TEMPLATE_ID;
const USER_ID = import.meta.env.VITE_EMAILJS_USER_ID;

const RaiseTicketModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    user_email: "",
    subject: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRaiseTicket = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, form, USER_ID);
      setForm({ user_email: "", subject: "", description: "" });
      toast.success("🎉 Ticket submitted successfully!");
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Raise a Support Ticket">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
        className="max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden"
      >

        <form
          onSubmit={handleRaiseTicket}
          className="px-6 sm:px-8 py-6 space-y-5"
          autoComplete="off"
        >
          {/* Email */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <label
              htmlFor="user_email"
              className="text-sm font-medium text-purple-700 flex items-center"
            >
              <Mail className="h-4 w-4 mr-2 text-purple-500" />
              Your Email
            </label>
            <input
              id="user_email"
              type="email"
              name="user_email"
              value={form.user_email}
              onChange={handleChange}
              required
              aria-label="Your Email"
              className="w-full px-4 py-3 bg-purple-50 border-2 border-purple-200 text-purple-900 placeholder-purple-400 focus:border-purple-500 focus:outline-none rounded-xl"
              placeholder="you@example.com"
              disabled={loading}
            />
          </motion.div>

          {/* Subject */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <label
              htmlFor="subject"
              className="text-sm font-medium text-purple-700 flex items-center"
            >
              <FileText className="h-4 w-4 mr-2 text-purple-500" />
              Subject
            </label>
            <input
              id="subject"
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              aria-label="Ticket Subject"
              className="w-full px-4 py-3 bg-purple-50 border-2 border-purple-200 text-purple-900 placeholder-purple-400 focus:border-purple-500 focus:outline-none rounded-xl"
              placeholder="Ticket subject"
              disabled={loading}
            />
          </motion.div>

          {/* Description */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <label
              htmlFor="description"
              className="text-sm font-medium text-purple-700 flex items-center"
            >
              <MessageSquareText className="h-4 w-4 mr-2 text-purple-500" />
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Describe your issue..."
              aria-label="Ticket Description"
              className="w-full px-4 py-3 bg-purple-50 border-2 border-purple-200 text-purple-900 placeholder-purple-400 focus:border-purple-500 focus:outline-none rounded-xl"
              disabled={loading}
            />
          </motion.div>

          {/* Buttons */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <button
              type="submit"
              disabled={
                loading ||
                !form.user_email.trim() ||
                !form.subject.trim() ||
                !form.description.trim()
              }
              className="w-full py-3 cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span> Sending...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Submit Ticket
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full cursor-pointer mt-3 py-2 text-purple-700 hover:text-purple-900 text-sm"
              disabled={loading}
            >
              Cancel
            </button>
          </motion.div>
        </form>
      </motion.div>
    </Modal>
  );
};

export default RaiseTicketModal;
