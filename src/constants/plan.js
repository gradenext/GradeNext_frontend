// utils/plans.js
const plans = {
  monthly: [
    {
      id: "basic",
      name: "Basic",
      description: "Access to Practice Quest",
      amount: 1900,
      stripe_price_id: "price_1RkLfnGb17a8LOzTPGy2XaGQ",
    },
    {
      id: "pro",
      name: "Pro",
      description: "Practice + Time Travel access",
      amount: 4900,
      stripe_price_id: "price_1RkUWjGb17a8LOzTZITqbxrU",
    },
    {
      id: "advanced",
      name: "Advanced",
      description: "Full access: Practice, Time Travel & Treasure Hunt",
      amount: 9900,
      stripe_price_id: "price_1_month_advanced",
    },
  ],
  quarterly: [
    {
      id: "basic",
      name: "Basic",
      description: "Access to Practice Quest",
      amount: 5100,
      stripe_price_id: "price_1RkLfnGb17a8LOzTPGy2XaGQ",
    },
    {
      id: "pro",
      name: "Pro",
      description: "Practice + Time Travel access",
      amount: 13500,
      stripe_price_id: "price_1RkLkEGb17a8LOzTp852tcXQ",
    },
    {
      id: "advanced",
      name: "Advanced",
      description: "Full access: Practice, Time Travel & Treasure Hunt",
      amount: 27000,
      stripe_price_id: "price_1Ro76uGb17a8LOzTSECpf00R",
    },
  ],
  "half-yearly": [
    {
      id: "basic",
      name: "Basic",
      description: "Access to Practice Quest",
      amount: 9900,
      stripe_price_id: "price_1RkLioGb17a8LOzTOiILxrzY",
    },
    {
      id: "pro",
      name: "Pro",
      description: "Practice + Time Travel access",
      amount: 24900,
      stripe_price_id: "price_1RkLkcGb17a8LOzTFALlCndd",
    },
    {
      id: "advanced",
      name: "Advanced",
      description: "Full access: Practice, Time Travel & Treasure Hunt",
      amount: 49900,
      stripe_price_id: "price_1RkLioGb17a8LOzTOiILxrzY",
    },
  ],
  yearly: [
    {
      id: "basic",
      name: "Basic",
      description: "Access to Practice Quest",
      amount: 19000,
      stripe_price_id: "price_1Ro77VGb17a8LOzTO6j3Te2c",
    },
    {
      id: "pro",
      name: "Pro",
      description: "Practice + Time Travel access",
      amount: 49000,
      stripe_price_id: "price_1RkLlNGb17a8LOzTHXaQVhTg",
    },
    {
      id: "advanced",
      name: "Advanced",
      description: "Full access: Practice, Time Travel & Treasure Hunt",
      amount: 99000,
      stripe_price_id: "price_1_year_advanced",
    },
  ],
};

export default plans;
