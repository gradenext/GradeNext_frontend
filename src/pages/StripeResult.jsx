import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const StripeResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get("status");
    if (status === "success") {
      alert("✅ Payment successful!");
      navigate("/dashboard");
    } else {
      alert("❌ Payment cancelled.");
      navigate("/pricing");
    }
  }, [location, navigate]);

  return <div className="text-center mt-20 text-xl">Processing...</div>;
};

export default StripeResult;
