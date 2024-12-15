"use client";

import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "./RegisterForm.scss";
import { useForm } from "react-hook-form";

import { useAuth } from "@/context/AuthContext";

export default function RegisterForm() {
    const { registerUser } = useAuth();

    const [showed, setShowed] = useState(false);
    const [showedRe, setShowedRe] = useState(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const { mutate, isLoading } = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            router.push("/home");
        },
    });

    const submitHandler = data => {
        if (data.password === data.rePassword) {
            // Trigger the mutation with form data
            mutate({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
            });
        } else {
            console.error("Passwords do not match");
        }
    };

    return (
        <div className="register">
            <h1 className="register-title"> Sign Up</h1>
            <form className="register-form" onSubmit={handleSubmit(submitHandler)}>
                <div className="register-row">
                    <input
                        {...register("firstName", {
                            required: "First Name is required",
                        })}
                        placeholder="First Name"
                        type="text"
                    />
                </div>
                {errors.firstName && <div className="register-error-message">{errors.firstName.message}</div>}
                <div className="register-row">
                    <input
                        {...register("lastName", {
                            required: "Last Name is required",
                        })}
                        placeholder="Last Name"
                        type="text"
                    />
                </div>
                {errors.lastName && <div className="register-error-message">{errors.lastName.message}</div>}
                <div className="register-row">
                    <input
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Enter a valid email",
                            },
                        })}
                        placeholder="Email"
                        type="email"
                    />
                </div>
                {errors.email && <div className="register-error-message">{errors.email.message}</div>}
                <div className="register-row">
                    <input
                        {...register("password", {
                            required: "Password is required", // handle empty input
                            minLength: {
                                value: 6, // minimum length
                                message: "Password must be at least 6 characters long", // message if length is under 6 char
                            },
                        })}
                        placeholder="Password"
                        type={showed ? "text" : "password"}
                    />

                    {showed ? (
                        <FaRegEyeSlash
                            className="show-icon"
                            onClick={() => {
                                setShowed(!showed);
                            }}
                        />
                    ) : (
                        <FaRegEye
                            className="hide-icon"
                            onClick={() => {
                                setShowed(!showed);
                            }}
                        />
                    )}
                </div>
                {errors.password && <div className="register-error-message">{errors.password.message}</div>}
                <div className="register-row">
                    <input
                        {...register("rePassword", {
                            required: "Please confirm your password",
                            validate: value => value === watch("password") || "Passwords do not match",
                        })}
                        placeholder="Repeat Password"
                        type={showed ? "text" : "password"}
                    />

                    {showedRe ? (
                        <FaRegEyeSlash
                            className="show-icon"
                            onClick={() => {
                                setShowedRe(!showedRe);
                            }}
                        />
                    ) : (
                        <FaRegEye
                            className="hide-icon"
                            onClick={() => {
                                setShowedRe(!showedRe);
                            }}
                        />
                    )}
                </div>
                {errors.rePassword && <div className="register-error-message">{errors.rePassword.message}</div>}
                <div className="register-btn-wrapper">
                    <button className="register-btn"> {isLoading ? "Registering..." : "Sign Up"} </button>
                </div>
            </form>
            <p className="text-to-register">
                Already have an account? <Link href="/login">Sign In</Link>
            </p>
        </div>
    );
}
