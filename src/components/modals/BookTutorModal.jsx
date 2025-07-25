import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, GraduationCap, BookOpen, Send } from "lucide-react";
import Modal from "../Modal";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";
import useStore from "../../store/store";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TUTOR_TEMPLATE_ID;
const USER_ID = import.meta.env.VITE_EMAILJS_USER_ID;

const SUBJECT_OPTIONS = [
  "Mathematics",
  "Science",
  "English",
  "Social Studies",
  "Computer Science",
  "Physics",
  "Chemistry",
  "Biology",
];

const GRADES = [
  "Kindergarten",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
];

const BookTutorModal = ({ isOpen, onClose }) => {
  const userId = useStore((state) => state.user?.account_id);

  const [form, setForm] = useState({
    email: "",
    phone: "",
    grade: "",
    subjects: [],
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const toggleSubject = (subject) => {
    setForm((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      ...form,
      subjects: form.subjects.join(", "),
      userId,
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, data, USER_ID);
      toast.success("📚 Tutor request submitted successfully!");
      setForm({ email: "", phone: "", grade: "", subjects: [] });
      onClose();
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Book a Tutor">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-3 px-3"
          autoComplete="off"
        >
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-blue-700 flex items-center">
              <Mail className="h-4 w-4 mr-2 text-blue-500" />
              Your Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-blue-50 border-2 border-blue-200 text-blue-900 placeholder-blue-400 focus:border-blue-500 focus:outline-none rounded-xl"
              disabled={loading}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-blue-700 flex items-center">
              <Phone className="h-4 w-4 mr-2 text-blue-500" />
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="+91 9876543210"
              className="w-full px-4 py-3 bg-blue-50 border-2 border-blue-200 text-blue-900 placeholder-blue-400 focus:border-blue-500 focus:outline-none rounded-xl"
              disabled={loading}
            />
          </div>

          {/* Grade Dropdown */}
          <div>
            <label className="text-sm font-medium text-blue-700 flex items-center">
              <GraduationCap className="h-4 w-4 mr-2 text-blue-500" />
              Grade
            </label>
            <select
              name="grade"
              value={form.grade}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-blue-50 border-2 border-blue-200 text-blue-900 focus:border-blue-500 focus:outline-none rounded-xl"
              disabled={loading}
            >
              <option value="">-- Select Grade --</option>
              {GRADES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Subjects Checkboxes */}
          <div>
            <label className="text-sm font-medium text-blue-700 flex items-center mb-1">
              <BookOpen className="h-4 w-4 mr-2 text-blue-500" />
              Subjects
            </label>
            <div className="grid grid-cols-2 gap-2">
              {SUBJECT_OPTIONS.map((subj) => (
                <label
                  key={subj}
                  className="flex items-center space-x-2 text-blue-800 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={form.subjects.includes(subj)}
                    onChange={() => toggleSubject(subj)}
                    className="accent-blue-600 w-4 h-4 rounded"
                    disabled={loading}
                  />
                  <span>{subj}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <motion.div>
            <button
              type="submit"
              disabled={
                loading ||
                !form.email.trim() ||
                !form.phone.trim() ||
                !form.grade.trim() ||
                form.subjects.length === 0
              }
              className="w-full py-3 cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span> Booking...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Book Tutor
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full cursor-pointer mt-3 py-2 text-blue-700 hover:text-blue-900 text-sm"
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

export default BookTutorModal;
