"use client";

import "./PlanCard.scss";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useCont } from "@/context/ContentContext";

export default function PlanCard({ plan }) {
    const { userData } = useAuth();
    const { setSelectedPlan } = useCont();
    const router = useRouter();

    return (
        <div className="card-container">
            <h2 className="card-title">{plan.name}</h2>
            <p className="card-description"> {plan.description}</p>
            <p className="card-price">{plan.price}</p>

            <ul className="card-features-list">
                {plan.features.map((feature, index) => (
                    <li className="card-featire" key={index}>
                        {feature}
                    </li>
                ))}
            </ul>
            {userData ? (
                <button
                    onClick={() => {
                        router.push("/checkout");

                        setSelectedPlan(plan);
                    }}
                    className="card-subscribe-btn"
                >
                    Subscribe
                </button>
            ) : (
                <button
                    onClick={() => {
                        router.push("/login");
                    }}
                    className="card-subscribe-btn"
                >
                    Subscribe
                </button>
            )}
        </div>
    );
}
