"use client";
import { useCont } from "@/context/ContentContext";
import "./Checkout.scss";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

export default function Checkout() {
    const router = useRouter();
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const { selectedPlan, makeSubscription } = useCont();
    const { userData } = useAuth();

    const [termsChecked, setTermsChecked] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isValid },
    } = useForm({
        mode: "onChange", // Enable real-time validation feedback
    });

    // Populate form fields with user data when user is loaded
    useEffect(() => {
        if (userData) {
            setValue("firstName", userData.firstName);
            setValue("lastName", userData.lastName);
            setValue("email", userData.email);
            setValue("phone", userData.phone || "");
            setValue("address", userData.address || "");
        }
    }, [userData, setValue]);

    const { mutate } = useMutation({
        mutationFn: makeSubscription,
        onSuccess: () => {
            router.push("/home");
        },
    });

    const currentDate = new Date();
    const expireDate = new Date();
    expireDate.setDate(currentDate.getDate() + 30);

    function expireDateFormat(e) {
        const date = e.target.value;
        if (date.length == 2) {
            setValue("expiryDate", date + "/");
        }
    }
    function cardNumberFormating(e) {
        const cardNum = e.target.value;
        if (cardNum.length == 4) {
            setValue("cardNumber", cardNum + "-");
        } else if (cardNum.length == 9) {
            setValue("cardNumber", cardNum + "-");
        } else if (cardNum.length == 14) {
            setValue("cardNumber", cardNum + "-");
        }
    }
    const submitHandler = data => {
        mutate({
            owner: userData.id,
            address: data.address,
            name: selectedPlan.name,
            status: "Active",
            expireAt: `${expireDate.getFullYear()}-${months[expireDate.getMonth()]}-${expireDate.getDate()}`,
        });
    };

    const isSubmitDisabled = !termsChecked || !watch("phone") || !watch("address");

    return (
        <div className="checkout">
            <h1 className="checkout-title">Checkout</h1>
            <div className="checkout-content">
                <div className="checkout-left-side">
                    {selectedPlan && (
                        <div className="plan-details">
                            <h2 className="plan-title">{selectedPlan.name}</h2>
                            <p className="plan-description">{selectedPlan.description}</p>
                            <p className="plan-price">Price: {selectedPlan.price}</p>
                            <ul className="plan-features">
                                {selectedPlan.features.map((feature, index) => (
                                    <li className="feature-item" key={index}>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <div className="total-cost">
                                <strong>Total Cost:</strong> {selectedPlan.price}
                            </div>
                        </div>
                    )}
                </div>
                <div className="checkout-right-side">
                    <h2 className="checkout-title">Billing Information</h2>
                    <form className="billing-form" onSubmit={handleSubmit(submitHandler)}>
                        <input
                            type="text"
                            {...register("firstName", { required: "First name is required" })}
                            placeholder="First Name"
                            className="input-field"
                        />
                        {errors.firstName && <p className="error">{errors.firstName.message}</p>}

                        <input
                            type="text"
                            {...register("lastName", { required: "Last name is required" })}
                            placeholder="Last Name"
                            className="input-field"
                        />
                        {errors.lastName && <p className="error">{errors.lastName.message}</p>}

                        <input
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email format",
                                },
                            })}
                            placeholder="Email"
                            className="input-field"
                        />
                        {errors.email && <p className="error">{errors.email.message}</p>}

                        <input
                            type="text"
                            {...register("phone", { required: "Phone number is required" })}
                            placeholder="Phone"
                            className="input-field"
                        />
                        {errors.phone && <p className="error">{errors.phone.message}</p>}

                        <input
                            type="text"
                            {...register("address", { required: "Address is required" })}
                            placeholder="Address"
                            className="input-field"
                        />
                        {errors.address && <p className="error">{errors.address.message}</p>}

                        <h3 className="payment-header">Payment Details</h3>
                        <div className="card-details">
                            <div className="input-group">
                                <label htmlFor="card-number">Card Number</label>
                                <input
                                    type="text"
                                    id="card-number"
                                    placeholder="1234 5678 9101 1121"
                                    className="input-field"
                                    {...register("cardNumber", {
                                        required: "Card number is required",
                                        pattern: {
                                            value: /^\d{19}$/,
                                            message: "Card number must be 16 digits",
                                        },
                                    })}
                                    onChange={cardNumberFormating}
                                />
                                {errors.cardNumber && <p className="error">{errors.cardNumber.message}</p>}
                            </div>
                            <div className="input-row">
                                <div className="input-group">
                                    <label htmlFor="expiry-date">Expiry Date</label>
                                    <input
                                        type="text"
                                        id="expiry-date"
                                        placeholder="MM/YY"
                                        className="input-field"
                                        {...register("expiryDate", {
                                            required: "Expiry date is required",
                                            pattern: {
                                                value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                                                message: "Invalid expiry date format",
                                            },
                                        })}
                                        onChange={expireDateFormat}
                                    />
                                    {errors.expiryDate && <p className="error">{errors.expiryDate.message}</p>}
                                </div>
                                <div className="input-group">
                                    <label htmlFor="cvc">CVC</label>
                                    <input
                                        type="text"
                                        id="cvc"
                                        placeholder="123"
                                        className="input-field"
                                        {...register("cvc", {
                                            required: "CVC is required",
                                            pattern: {
                                                value: /^\d{3}$/,
                                                message: "CVC must be 3 digits",
                                            },
                                        })}
                                    />
                                    {errors.cvc && <p className="error">{errors.cvc.message}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="terms">
                            <input type="checkbox" className="checkbox" onChange={e => setTermsChecked(e.target.checked)} />
                            <label>
                                I agree to the <a href="/terms">terms and conditions</a>
                            </label>
                        </div>

                        <button type="submit" className="submit-btn" disabled={isSubmitDisabled}>
                            Get Subscription
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
