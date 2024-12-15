"use client";

import React, { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import "./PlanSlider.scss";
import SliderCard from "../SliderCard/SliderCard";

import "./PlanSlider.scss";

const PlanSlider = ({ plans, isAuthenticated }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentPlan = plans[currentIndex];
    // Auto-slide every 15 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 15000);
        return () => clearInterval(interval); // Cleanup on component unmount
    }, [currentIndex]);

    const handleNext = () => {
        setCurrentIndex(prevIndex => (prevIndex === plans.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div>
            {currentPlan && (
                <div>
                    <SliderCard plan={currentPlan} />
                </div>
            )}
        </div>
    );
};

export default PlanSlider;
