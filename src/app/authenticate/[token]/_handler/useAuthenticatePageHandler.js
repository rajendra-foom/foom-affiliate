"use client";
import { useParams, useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

const ERROR_MESSAGES = {
    TOKEN_REQUIRED: "Token tidak ditemukan dalam URL",
    INVALID_TOKEN: "Token tidak valid atau sudah kedaluwarsa",
    TOKEN_EXPIRED: "Token sudah kedaluwarsa, silakan coba lagi",
    SERVER_ERROR: "Terjadi kesalahan server, silakan coba lagi",
    AUTHENTICATION_FAILED: "Gagal melakukan autentikasi, silakan coba lagi",
    INVALID_RESPONSE: "Respons server tidak valid, silakan coba lagi",
    NETWORK_ERROR: "Koneksi internet bermasalah, silakan coba lagi",
};

export default function useAuthenticatePageHandler() {
    const router = useRouter();
    const { token } = useParams();

    const [status, setStatus] = useState("validating");
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    const handleAuthentication = useCallback(async () => {
        if (!token) {
            setStatus("error");
            setError("TOKEN_REQUIRED");
            return;
        }

        if (token === "login-required") {
            setStatus("login-required");
            return;
        }

        try {
            setStatus("authenticating");
            setError(null);

            const result = await signIn("authenticate", {
                token,
                redirect: false,
            });

            if (result?.error) {
                setStatus("error");
                setError(result.error);
                return;
            }

            if (result?.ok) {
                setStatus("success");
                await getSession();
                router.push("/");
            }
        } catch {
            setStatus("error");
            setError("NETWORK_ERROR");
        }
    }, [token, router]);

    const handleRetry = useCallback(() => {
        if (retryCount < 3) {
            setRetryCount((prev) => prev + 1);
            handleAuthentication();
        }
    }, [retryCount, handleAuthentication]);

    useEffect(() => {
        handleAuthentication();
    }, [handleAuthentication]);

    return {
        status,
        error,
        errorMessage: error ? ERROR_MESSAGES[error] : null,
        handleRetry,
        canRetry: retryCount < 3 && status === "error",
        isLoading: ["validating", "authenticating"].includes(status),
        isSuccess: status === "success",
        isError: status === "error",
        isLoginRequired: status === "login-required",
    };
}