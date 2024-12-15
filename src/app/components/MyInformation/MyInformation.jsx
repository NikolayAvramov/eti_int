"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./MyInformation.scss";
import { useAuth } from "@/context/AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

export default function MyInformation() {
    const [isEditing, setIsEditing] = useState(false);
    const { getMyProfile, updateMyProfile } = useAuth();

    const { register, handleSubmit, setValue } = useForm();

    const pathname = usePathname();
    const id = pathname.split("/")[2];

    const {
        data: user,
        isLoading,
        isError,
    } = useQuery({
        queryFn: () => getMyProfile(id),
        queryKey: ["user", id],
        enabled: !!id, // Ensure the query runs only when `id` exists
    });

    useEffect(() => {
        if (user) {
            setValue("firstName", user.firstName);
            setValue("lastName", user.lastName);
            setValue("email", user.email);
            setValue("phone", user.phone);
            setValue("address", user.address);
        }
    }, [user, setValue]);

    // Mutation for updating the profile

    const { mutate, isLoading: isUpdating } = useMutation({
        mutationFn: updateMyProfile,
        onSuccess: () => {
            setIsEditing(false); // End editing mode after successful update
        },
        onError: error => {
            console.error("Error updating profile:", error);
        },
    });

    // Handler for saving profile changes
    const submitHandler = data => {
        mutate({
            id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone || "",
            address: data.address || "",
        });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading user data. Please try again later.</div>;
    }

    return (
        <section className="profile">
            <h2>Profile Information</h2>
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className="field">
                    <label htmlFor="name">First Name</label>
                    <input type="text" {...register("firstName")} readOnly={!isEditing} />
                </div>
                <div className="field">
                    <label htmlFor="name">Last Name</label>
                    <input type="text" {...register("lastName")} readOnly={!isEditing} />
                </div>
                <div className="field">
                    <label htmlFor="email">Email</label>
                    <input type="email" {...register("email")} readOnly={!isEditing} />
                </div>
                <div className="field">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" {...register("phone")} readOnly={!isEditing} />
                </div>
                <div className="field">
                    <label htmlFor="address">Address</label>
                    <textarea {...register("address")} readOnly={!isEditing}></textarea>
                </div>
                <div className="actions">
                    {isEditing && (
                        <>
                            <button type="submit" className="saveButton" disabled={isUpdating}>
                                {isUpdating ? "Saving..." : "Save Changes"}
                            </button>
                            <button type="button" className="cancelButton" onClick={() => setIsEditing(false)}>
                                Cancel
                            </button>
                        </>
                    )}
                </div>
            </form>
            {!isEditing && (
                <button
                    type="button"
                    className="editButton"
                    onClick={() => {
                        setIsEditing(true);
                    }}
                >
                    Edit Profile
                </button>
            )}
        </section>
    );
}
