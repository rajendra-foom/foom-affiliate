import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            id: "authenticate",
            credentials: {
                token: { type: "text" },
            },
            async authorize({ token }) {
                try {
                    console.log("TOKEN RECEIVED:", token);

                    const res = await fetch(
                        `${process.env.BACKEND_URL}/api/v3/affiliate/my-affiliate`,
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );

                    console.log("BACKEND STATUS:", res.status);
                    const data = await res.json();
                    console.log("BACKEND RESPONSE:", data);

                    if (!res.ok) return null;

                    return { token, ...data };
                } catch (e) {
                    console.error("AUTHORIZE ERROR:", e);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.backendToken = user.token;
            return token;
        },
        async session({ session, token }) {
            session.backendToken = token.backendToken;
            return session;
        },
    },
    pages: {
        signIn: "/authenticate/login-required",
        error: "/authenticate/login-required",
    },
};