import React, { useState } from "react";
import PlanCard from "../components/PlanCard";
import { createCheckoutSession } from "../services/stripe";

const plans = [
    {
        id: "basic",
        name: "Basic",
        description: "Access to Practice Quest",
        prices: {
            monthly: { amount: 1900, stripe_price_id: "price_1_month_basic" },
            quarterly: { amount: 5100, stripe_price_id: "price_1_quarter_basic" },
            yearly: { amount: 19000, stripe_price_id: "price_1_year_basic" },
        },
    },
    {
        id: "pro",
        name: "Pro",
        description: "Practice + Time Travel access",
        prices: {
            monthly: { amount: 4900, stripe_price_id: "price_1RkUWjGb17a8LOzTZITqbxrU" },
            quarterly: { amount: 13500, stripe_price_id: "price_1_quarter_pro" },
            yearly: { amount: 49000, stripe_price_id: "price_1_year_pro" },
        },
    },
    {
        id: "advanced",
        name: "Advanced",
        description: "Full access: Practice, Time Travel & Treasure Hunt",
        prices: {
            monthly: { amount: 9900, stripe_price_id: "price_1_month_advanced" },
            quarterly: { amount: 27000, stripe_price_id: "price_1_quarter_advanced" },
            yearly: { amount: 99000, stripe_price_id: "price_1_year_advanced" },
        },
    },
];

const Pricing = () => {
    const [selectedCycle, setSelectedCycle] = useState("monthly");

    const handlePlanSelect = async (planId) => {
        const durationMap = {
            monthly: 1,
            quarterly: 3,
            yearly: 12,
        };

        try {
            const response = await createCheckoutSession({
                plan: planId,
                duration: durationMap[selectedCycle],
            });
            window.location.href = response.url;
        } catch (err) {
            alert("Error creating Stripe session.");
        }
    };


    return (
        <div className="min-h-screen bg-gray-50 py-16 px-6">
            <h1 className="text-4xl font-bold text-center mb-10 text-indigo-700">
                Choose Your Plan
            </h1>

            <div className="flex justify-center mb-10 space-x-4">
                {["monthly", "quarterly", "yearly"].map((cycle) => (
                    <button
                        key={cycle}
                        className={`py-2 px-4 rounded-lg border ${selectedCycle === cycle
                                ? "bg-indigo-600 text-white"
                                : "bg-white text-gray-800"
                            }`}
                        onClick={() => setSelectedCycle(cycle)}
                    >
                        {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
                    </button>
                ))}
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {plans.map((plan) => (
                    <PlanCard
                        key={plan.id}
                        plan={plan}
                        selectedCycle={selectedCycle}
                        onSelect={handlePlanSelect}
                    />
                ))}
            </div>
        </div>
    );
};

export default Pricing;
