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
      stripe_price_id: "price_1RkLjoGb17a8LOzTVkryXYZd",
    },
    {
      id: "enterprise",
      name: "Advanced",
      description: "Full access: Practice, Time Travel & Treasure Hunt",
      amount: 9900,
      stripe_price_id: "price_1RkLlgGb17a8LOzTUhTvVarE",
    },
  ],
  quarterly: [
    {
      id: "basic",
      name: "Basic",
      description: "Access to Practice Quest",
      amount: 5700,
      stripe_price_id: "price_1RkLi6Gb17a8LOzTnk7lXlxq",
    },
    {
      id: "pro",
      name: "Pro",
      description: "Practice + Time Travel access",
      amount: 14700,
      stripe_price_id: "price_1RkLkEGb17a8LOzTp852tcXQ",
    },
    {
      id: "enterprise",
      name: "Advanced",
      description: "Full access: Practice, Time Travel & Treasure Hunt",
      amount: 29700,
      stripe_price_id: "price_1RkLm6Gb17a8LOzTfZfKxXpL",
    },
  ],
  "half-yearly": [
    {
      id: "basic",
      name: "Basic",
      description: "Access to Practice Quest",
      amount: 11400,
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
      id: "enterprise",
      name: "Advanced",
      description: "Full access: Practice, Time Travel & Treasure Hunt",
      amount: 59400,
      stripe_price_id: "price_1RkLmaGb17a8LOzTC18TsDox",
    },
  ],
  yearly: [
    {
      id: "basic",
      name: "Basic",
      description: "Access to Practice Quest",
      amount: 22800,
      stripe_price_id: "price_1RkLjPGb17a8LOzTal2EdaXF",
    },
    {
      id: "pro",
      name: "Pro",
      description: "Practice + Time Travel access",
      amount: 58800,
      stripe_price_id: "price_1RkLlNGb17a8LOzTHXaQVhTg",
    },
    {
      id: "enterprise",
      name: "Advanced",
      description: "Full access: Practice, Time Travel & Treasure Hunt",
      amount: 118800,
      stripe_price_id: "price_1RkLn2Gb17a8LOzTOZ49y2AS",
    },
  ],
};

export default plans;
