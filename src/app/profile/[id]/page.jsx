import MyInformation from "@/app/components/MyInformation/MyInformation";
import MySubscription from "@/app/components/MySubscription/MySubscription";
import "./Profile.scss";
export default function myProfilePage() {
    return (
        <div className="container">
            <MyInformation />
            <MySubscription />
        </div>
    );
}
