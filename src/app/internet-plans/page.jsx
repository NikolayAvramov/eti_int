import PlanCard from "../components/PlanCard/PlanCard";
import { internetPlans } from "@/data";
import PlanSlider from "../components/PlanSlider/PlanSlider";
import "./InternetPlans.scss";

export default function InternetPlans() {
    const plans = internetPlans;

    return (
        <section className="internet">
            <div className="internet-video-background">
                <video autoPlay muted loop className="internet-background-video" src="/videos/iwep.mp4" />
                <div className="internet-content-wrapper">
                    <h2 className="internet-page-title">Internet plans</h2>
                    <div className="internet-plans-slider">
                        <PlanSlider plans={plans} isAuthenticated={true} />
                    </div>
                    <div className="internet-plans-container">
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
