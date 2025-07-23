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
import Modal from "./components/Modal";
import toast from "react-hot-toast";
import Pricing from "./pages/Pricing";
import StripeResult from "./pages/StripeResult";
import PricingSuccess from "./pages/PricingSuccess";
import Subscription from "./components/user/Subscription";
import PricingFailure from "./pages/PricingFailure";
import PlanRestriction from "./components/modals/PlanRestriction";
import PlanExpiredNotice from "./components/modals/PlanExpiredNotice";
import PlanCancelledNotice from "./components/modals/PlanCancelledNotice";
import PlanNotice from "./components/modals/PlanNotice";

function App() {
  const token = useStore((state) => state.token);
  const isOpen = useStore((state) => state.showUpgradeModal);
  const subscription = useStore((state) => state?.user?.subscription);
  const plan_type = useStore((state) => state?.user?.subscription?.plan_type);
  const trial_expired_in_days = useStore(
    (state) => state?.user?.trial_expired_in_days
  );
  const toogleShowUpgradeModal = useStore(
    (state) => state.toogleShowUpgradeModal
  );

  const getNotice = () => {
    if (
      subscription === null ||
      (plan_type === "trial" && trial_expired_in_days > 0)
    )
      return <PlanRestriction />;
    else if (subscription?.status === "expired") return <PlanExpiredNotice />;
    else if (subscription?.status === "cancelled")
      return <PlanCancelledNotice />;
    else if (subscription?.status === "active") return <PlanNotice />;
  };

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
            <Route path="/pricing-cancel" element={<PricingFailure />} />

            <Route path="/user" element={<User />}>
              <Route path="profile" element={<UserProfile />} />
              <Route path="stats" element={<UserStats />} />
              <Route path="plan" element={<Subscription />} />
              <Route
                path="*"
                element={<Navigate to={"/user/profile"} replace />}
              />
            </Route>
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
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        )}

        <Modal
          isOpen={isOpen}
          title={"Upgrade you plan"}
          onClose={() => toogleShowUpgradeModal(false)}
          allowClose={
            subscription === null ||
            (plan_type === "trial" && trial_expired_in_days > 0) ||
            subscription?.status === "active"
          }
        >
          {getNotice()}
        </Modal>
      </div>
    );
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
}

export default App;
