"use client";

import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";

import "./LoginForm.scss";

export default function LoginForm() {
    const { loginUser } = useAuth();

    const [showed, setShowed] = useState(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const { mutate } = useMutation({
        mutationFn: loginUser,
        onSuccess: () => {
            router.push("/");
        },
    });

    const submitHandler = data => {
        mutate({
            email: data.email,
            password: data.password,
        });
    };
    return (
        <div className="login">
            <h1 className="login-title">Sign In!</h1>
            <form className="login-form" onSubmit={handleSubmit(submitHandler)}>
                <div className="login-row">
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
                <div className="login-row">
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
                <div className="login-btn-wrapper">
                    <button className="login-btn">Sign In</button>
                </div>
            </form>
            <p className="text-to-register">
                Don't have an accout yet? <Link href="/register">Sign up</Link>
            </p>
        </div>
    );
}
