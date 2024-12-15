import { useRouter } from "next/navigation";
import "./SliderCard.scss";
import { useCont } from "@/context/ContentContext";
import { useAuth } from "@/context/AuthContext";
export default function SliderCard({ plan }) {
    const { setSelectedPlan } = useCont();
    const { userData } = useAuth();
    const router = useRouter();

    return (
        <div className="slider-card-container">
            <h2 className="slider-card-title">{plan.name}</h2>
            <p className="slider-card-description">{plan.description}</p>
            <p className="slider-card-price">{plan.price}</p>

            <ul className="slider-card-features-list">
                {plan.features.map((feature, index) => (
                    <li className="slider-card-featire" key={index}>
                        {feature}
                    </li>
                ))}
            </ul>
            <div className="slider-card-button-wrapper">
                {!userData ? (
                    <button
                        className="slider-card-button"
                        onClick={() => {
                            router.push("/login");

                            setSelectedPlan(plan);
                        }}
                    >
                        Get NOW
                    </button>
                ) : (
                    <button
                        className="slider-card-button"
                        onClick={() => {
                            router.push("/checkout");

                            setSelectedPlan(plan);
                        }}
                    >
                        Get NOW
                    </button>
                )}
            </div>
        </div>
    );
}
