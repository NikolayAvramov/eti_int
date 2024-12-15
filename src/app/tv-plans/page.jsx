import PlanCard from "../components/PlanCard/PlanCard";
import { tvPlans } from "@/data";
import PlanSlider from "../components/PlanSlider/PlanSlider";
import "./TvPlans.scss";

export default function TvPlans() {
    const plans = tvPlans;

    return (
        <section className="tv">
            <div className="tv-image-background">
                {/* <video autoPlay muted loop className="tv-background-video" src="/videos/tv1.mp4" /> */}
                <div className="tv-content-wrapper">
                    <h2 className="tv-page-title">TV plans</h2>
                    <div className="tv-plans-slider">
                        <PlanSlider plans={plans} isAuthenticated={true} />
                    </div>
                    <div className="tv-plans-container">
                        {plans ? (
                            plans.map(plan => <PlanCard key={plan._id} plan={plan} />)
                        ) : (
                            <div>
                                <p>No avalable plans at the moment</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
