"use client";

import { useCont } from "@/context/ContentContext";
import { useQuery } from "@tanstack/react-query";
import "./MySubscriptions.scss";
import { usePathname } from "next/navigation";
export default function MySubscription() {
    const { getMySubscription } = useCont();

    const pathname = usePathname();
    const id = pathname.split("/")[2];
    const {
        data: mySubscriptions,
        isLoading,
        isError,
    } = useQuery({
        queryFn: () => getMySubscription(id),
        queryKey: ["mySubscriptions", id],
        enabled: !!id,
    });
    return (
        <section className="subscriptions">
            <h2>My Subscriptions</h2>
            {isLoading ? (
                <p>Loading subscriptions...</p>
            ) : isError ? (
                <p>Error loading subscriptions. Please try again later.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Plan</th>
                            <th>Status</th>
                            <th>Expire Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mySubscriptions.length > 0 ? (
                            mySubscriptions.map(subscription => (
                                <tr key={subscription._id}>
                                    <td>{subscription.name}</td>
                                    <td>{subscription.status}</td>
                                    <td>{subscription.expireAt}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No subscriptions found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </section>
    );
}
