import api from "./api";

// Takes planId ("pro", "basic", etc.) and duration (1, 3, 12)
export const createCheckoutSession = async ({ plan, duration }) => {
  const response = await api.post("stripe/create-checkout-session/", {
    plan,
    duration,
    platform_fee_applied: true,
  });
  return response.data;
};
