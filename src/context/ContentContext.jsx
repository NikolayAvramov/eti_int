"use client";
const host = "http://localhost:3033";

import { createContext, useContext, useState } from "react";

const ContentContext = createContext();

export function ContentProvider({ children }) {
    const [selectedPlan, setSelectedPlan] = useState("");

    async function getMySubscription(id) {
        const response = await fetch(host + "/subscriptions/" + id);

        const mySubscription = await response.json();

        return mySubscription.subscriptions;
    }

    async function makeSubscription(subscriptionData) {
        const response = await fetch(host + "/subscriptions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(subscriptionData),
        });

        if (!response.ok) {
            throw new Error("Failed to make subscription");
        }

        const newSubscription = await response.json();

        return newSubscription;
    }

    return (
        <ContentContext.Provider value={{ setSelectedPlan, selectedPlan, makeSubscription, getMySubscription }}>
            {children}
        </ContentContext.Provider>
    );
}
export function useCont() {
    return useContext(ContentContext);
}
