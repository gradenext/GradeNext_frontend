// utils/plans.js
const plans = {
  monthly: [
    {
      id: "basic",
      name: "Basic",
      description: "Access to Practice Quest",
      amount: 4900,
      stripe_price_id: "price_1Rppx7Gb17a8LOzTCc2OiTU1",
    },
    {
      id: "pro",
      name: "Pro",
      description: "Practice + Time Travel access",
      amount: 9900,
      stripe_price_id: "price_1RpprxGb17a8LOzTAZcLqxG5",
    },
    {
      id: "advanced",
      name: "Advanced",
      description: "Full access: Practice, Time Travel & Treasure Hunt",
      amount: 19900,
      stripe_price_id: "price_1RppeiGb17a8LOzTDeQwDUUW",
    },
  ],
  quarterly: [
    {
      id: "basic",
      name: "Basic",
      description: "Access to Practice Quest",
      amount: 14000,
      stripe_price_id: "price_1RppvrGb17a8LOzTvat2qcNq",
    },
    {
      id: "pro",
      name: "Pro",
      description: "Practice + Time Travel access",
      amount: 28200,
      stripe_price_id: "price_1Rppr3Gb17a8LOzTyazLXwCb",
    },
    {
      id: "advanced",
      name: "Advanced",
      description: "Full access: Practice, Time Travel & Treasure Hunt",
      amount: 56700,
      stripe_price_id: "price_1RppdEGb17a8LOzTGtu6CyB8",
    },
  ],
  "half-yearly": [
    {
      id: "basic",
      name: "Basic",
      description: "Access to Practice Quest",
      amount: 26500,
      stripe_price_id: "price_1RppuSGb17a8LOzTVrPb3ZxJ",
    },
    {
      id: "pro",
      name: "Pro",
      description: "Practice + Time Travel access",
      amount: 53500,
      stripe_price_id: "price_1RppmuGb17a8LOzTvmIxoYnk",
    },
    {
      id: "advanced",
      name: "Advanced",
      description: "Full access: Practice, Time Travel & Treasure Hunt",
      amount: 107500,
      stripe_price_id: "price_1RppajGb17a8LOzTqTwOdltA",
    },
  ],
  yearly: [
    {
      id: "basic",
      name: "Basic",
      description: "Access to Practice Quest",
      amount: 50000,
      stripe_price_id: "price_1RpptEGb17a8LOzTh6IJSYQL",
    },
    {
      id: "pro",
      name: "Pro",
      description: "Practice + Time Travel access",
      amount: 101000,
      stripe_price_id: "price_1RpphUGb17a8LOzTbI1qbpuQ",
    },
    {
      id: "advanced",
      name: "Advanced",
      description: "Full access: Practice, Time Travel & Treasure Hunt",
      amount: 203000,
      stripe_price_id: "price_1RppYPGb17a8LOzTPJVGAYja",
    },
  ],
};

export default plans;
