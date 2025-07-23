import api from "./api";

// Takes planId ("pro", "basic", etc.) and duration (1, 3, 12)
export const createCheckoutSession = async ({
  plan,
  duration,
  platform_fee_applied,
}) => {
  const response = await api.post("stripe/create-checkout-session/", {
    plan,
    duration,
    platform_fee_applied,
  });
  return response.data;
};

export const cancelPlan = async () => {
  try {
    const response = await api.post("/stripe/cancel-subscription/", {});

    return response?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const changePlan = async ({ plan, duration }) => {
  try {
    const response = await api.post("/stripe/change-plan/", {
      plan,
      duration,
    });

    return response?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
