"use client"

import { getSession, signOut } from "next-auth/react";

const fetchData = async ({
                             method,
                             endpoint,
                             payload = {},
                             formData = false,
                             isFile = false,
                         }) => {
    const session = await getSession();
    const authHeader = session?.backendToken
        ? { Authorization: `Bearer ${session.backendToken}` }
        : {};

    // Build query string from payload.query, dropping null/undefined
    const cleanQuery = Object.fromEntries(
        Object.entries(payload.query || {}).filter(
            ([, value]) => value !== null && value !== undefined
        )
    );
    const queryString = Object.keys(cleanQuery).length
        ? `?${new URLSearchParams(cleanQuery).toString()}`
        : "";

    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}${queryString}`;

    const fetchOptions = {
        method,
        headers: {
            ...authHeader,
            "app-source": "WEB",
            ...(formData ? {} : { "Content-Type": "application/json" }),
        },
        body: ["POST", "PUT"].includes(method)
            ? formData
                ? payload.body
                : JSON.stringify(payload.body)
            : null,
    };

    const res = await fetch(url, fetchOptions);

    if (!res.ok) {
        const errorData = await res.json().catch(() => null);

        // Auto sign-out on token invalidation
        if (res.status === 401) {
            if (
                errorData?.code === "TOKEN_INVALID" ||
                errorData?.code === "CACHE_USER_INVALID"
            ) {
                await signOut({ redirect: false });
                window.location.href = "/authenticate/login-required";
                return;
            }
        }

        throw new Error(
            errorData?.message ||
            errorData?.error?.msg ||
            errorData?.error ||
            "Network Error"
        );
    }

    if (isFile) {
        return res.blob();
    }

    const json = await res.json();

    // v3 endpoints wrap data in { data: ... } — unwrap automatically
    const isV3 = endpoint.startsWith("/api/v3/") || endpoint.startsWith("/v3/");
    if (isV3) {
        return json.data;
    }

    return json;
};

export const postData = ({ endpoint, payload, formData, isFile }) =>
    fetchData({ method: "POST", endpoint, payload, formData, isFile });

export const getData = ({ endpoint, payload, formData, isFile }) =>
    fetchData({ method: "GET", endpoint, payload, formData, isFile });

export const putData = ({ endpoint, payload, formData, isFile }) =>
    fetchData({ method: "PUT", endpoint, payload, formData, isFile });

export const deleteData = ({ endpoint, payload, formData, isFile }) =>
    fetchData({ method: "DELETE", endpoint, payload, formData, isFile });