import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Quiz from "./pages/Quiz";
import useStore from "./store/store";
import TreasureHuntTopics from "./pages/TreasureHuntTopics";
import User from "./pages/User";
import ForgotPassword from "./pages/ForgotPassword";
import UserProfile from "./components/user/UserProfile";
import UserStats from "./components/user/UserStats";
import QuizReport from "./components/quiz/QuizReport";
import PlanRestriction from "./components/PlanRestriction";
import Modal from "./components/Modal";
import toast from "react-hot-toast";
import Pricing from "./pages/Pricing";
import StripeResult from "./pages/StripeResult";
import PricingSuccess from "./pages/PricingSuccess";
import Subscription from "./components/user/Subscription";

function App() {
  const token = useStore((state) => state.token);
  const isOpen = useStore((state) => state.showUpgradeModal) ?? false;
  const toogleShowUpgradeModal = useStore(
    (state) => state.toogleShowUpgradeModal
  );
  try {
    return (
      <div className="min-h-screen bg-gray-50">
        {!token ? (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/stripe-result" element={<StripeResult />} />
            <Route path="/pricing-success" element={<PricingSuccess />} />
            <Route
              path="/treasurehunt/topics/:subject"
              element={<TreasureHuntTopics />}
            />
            <Route
              path="/treasurehunt/:session_id/:subject/:topic"
              element={<Quiz />}
            />
            <Route path="/:mode/:session_id" element={<Quiz />} />
            <Route path="/report" element={<QuizReport />} />
            <Route path="/user" element={<User />}>
              <Route path="profile" element={<UserProfile />} />
              <Route path="stats" element={<UserStats />} />
              <Route path="plan" element={<Subscription />} />
              <Route
                path="*"
                element={<Navigate to={"/user/profile"} replace />}
              />
            </Route>
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        )}

        <Modal
          isOpen={isOpen}
          title={"Upgrade you plan"}
          onClose={() => toogleShowUpgradeModal(false)}
          closeOnOutsideClick={false}
        >
          <PlanRestriction />
        </Modal>
      </div>
    );
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
}

export default App;
