"use client";
import Link from "next/link";
import "./Navigation.scss";
import sb from "../../../../public/sb.png";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navigation() {
    const path = usePathname();

    const { getUser, userData, logout } = useAuth();
    useEffect(() => {
        getUser();
    }, [path]);

    return (
        <nav className="nav">
            <div className="nav-container">
                <div className="nav-logo">
                    <Link href="/">
                        <Image className="nav-logo-image" src={sb} alt="logo" />
                    </Link>
                </div>
                <ul className="nav-list">
                    <li>
                        <Link href="/internet-plans">Internet Plans</Link>
                    </li>
                    <li>
                        <Link href="/tv-plans">TV Plans</Link>
                    </li>
                    {!userData ? (
                        <>
                            <li>
                                <Link href="/login">Login</Link>
                            </li>
                            <li>
                                <Link href="/register">Register</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link href={`/profile/${userData.id}`}>My Profile</Link>
                            </li>
                            <li>
                                <Link
                                    href="/"
                                    onClick={() => {
                                        logout();
                                    }}
                                >
                                    Log out
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}
