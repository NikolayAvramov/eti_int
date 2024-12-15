"use client";
const host = "http://localhost:3033";

import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [userData, setUserData] = useState(null);
    function getUser() {
        const storedUser = Cookies.get("user");
        if (storedUser) {
            setUserData(JSON.parse(storedUser));
        }
    }

    async function updateMyProfile(newData) {
        try {
            const response = await fetch(host + "/users/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newData),
            });

            if (!response.ok) {
                throw new Error("Failed to update user information");
            }

            const userData = await response.json();
            const { password, ...user } = userData; // Exclude password from the user data

            setUserData(userData);

            Cookies.set(
                "user",
                JSON.stringify({
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    address: user.address,
                    phone: user.phone,
                }),
                { secure: true, sameSite: "None" }
            );

            return user;
        } catch (err) {
            console.error("Error fetching user profile:", err);
        }
    }

    async function getMyProfile(id) {
        try {
            const response = await fetch(host + "/users/" + id);

            if (!response.ok) {
                throw new Error("Failed to get user information");
            }

            const user = await response.json();

            const { password, ...userData } = user; // Exclude password from the user data
            setUserData(userData);

            return userData;
        } catch (err) {
            console.error("Error fetching user profile:", err);
        }
    }

    async function registerUser(userData) {
        const response = await fetch(host + "/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error("Failed to register user");
        }

        const user = await response.json();

        Cookies.set(
            "user",
            JSON.stringify({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                address: user.address,
                phone: user.phone,
            }),
            { secure: true, sameSite: "None" }
        );
        getUser();

        return user;
    }

    async function loginUser(userData) {
        const response = await fetch(host + "/users/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error("Failed to login user");
        }
        const user = await response.json();

        Cookies.set(
            "user",
            JSON.stringify({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                address: user.address,
                phone: user.phone,
            }),
            { secure: true, sameSite: "None" }
        );
        getUser();

        return user;
    }

    function logout() {
        setUserData(null);
        Cookies.remove("user");
    }

    return (
        <AuthContext.Provider value={{ userData, updateMyProfile, getMyProfile, getUser, loginUser, registerUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
