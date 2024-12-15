"use client";

import { useTypewriter, Cursor } from "react-simple-typewriter";

import "./Home.scss";

export default function HeroSecion() {
    const [text] = useTypewriter({
        words: [" Broadband", " For You"],
        loop: {},
    });

    return (
        <div className="hero">
            <video autoPlay loop muted className="hero-video">
                <source src="/videos/tv.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="hero-overlay">
                <div className="hero-content">
                    <h1 className="hero-main-title">
                        Something
                        <span className="hero-typing-text">{text}</span>
                        <Cursor />
                    </h1>
                    <h2>Unlimited Entertainment. Blazing Fast Speeds.</h2>
                    <p>Discover plans tailored for you and your family.</p>
                    <div className="hero-buttons">
                        <a href="#plans" className="hero-button-primary">
                            Explore Plans
                        </a>
                        <a href="#contact" className="hero-button-secondary">
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
