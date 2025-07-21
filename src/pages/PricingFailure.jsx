import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";

const PricingFailure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/pricing");
    }, 10000); // ⏳ 10 seconds
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-100 via-white to-yellow-100 text-center px-4">
      <XCircle className="text-red-500 w-20 h-20 mb-4" />
      <h1 className="text-4xl font-bold text-red-700 mb-2">Payment Failed</h1>
      <p className="text-gray-700 text-lg mb-6">
        Unfortunately, your payment could not be processed. You’ll be redirected
        to the pricing page in 10 seconds.
      </p>
      <button
        onClick={() => navigate("/pricing")}
        className="px-6 py-3 bg-red-600 text-white rounded-lg text-lg hover:bg-red-700 transition"
      >
        Retry Payment
      </button>
    </div>
  );
};

export default PricingFailure;
