import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const PricingSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 10000); // ⏳ 10 seconds
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 via-white to-indigo-100 text-center px-4">
      <CheckCircle className="text-green-500 w-20 h-20 mb-4" />
      <h1 className="text-4xl font-bold text-green-700 mb-2">
        Payment Successful!
      </h1>
      <p className="text-gray-700 text-lg mb-6">
        Your subscription is now active. You’ll be redirected to your dashboard in 10 seconds.
      </p>
      <button
        onClick={() => navigate("/dashboard")}
        className="px-6 py-3 bg-green-600 text-white rounded-lg text-lg hover:bg-green-700 transition"
      >
        Return to Dashboard
      </button>
    </div>
  );
};

export default PricingSuccess;
