"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthenticateRootPage() {
    const router = useRouter();

    useEffect(() => {
        router.push("/authenticate/login-required");
    }, [router]);

    return null;
}