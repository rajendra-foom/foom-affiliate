import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
    session: { strategy: "jwt" },
    providers: [
        CredentialsProvider({

            name: "Authenticate",
            id: "authenticate",
            credentials: {
                token: { label: "Token", type: "text" },
            },
            async authorize(credentials) {
                const { token } = credentials;
                if (!token) throw new Error("TOKEN_REQUIRED");

                const response = await fetch(
                    `${process.env.BACKEND_URL}/api/v3/affiliate/my-affiliate`,
                    { method: "GET", headers: { Authorization: `Bearer ${token}` } }
                );

                if (!response.ok) {
                    if (response.status === 401) throw new Error("INVALID_TOKEN");
                    if (response.status === 403) throw new Error("TOKEN_EXPIRED");
                    if (response.status >= 500) throw new Error("SERVER_ERROR");
                    throw new Error("AUTHENTICATION_FAILED");
                }

                const data = await response.json();
                console.log("uuid:", data.data.uuid);
                console.log("returning user object:", {
                    id: data.data.uuid,
                    backendToken: token,
                    authenticated: true,
                });

                return {
                    id: data.data.uuid,
                    backendToken: token,
                    authenticated: true,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.backendToken = user.backendToken;
            }
            return token;
        },
        async session({ session, token }) {
            session.backendToken = token.backendToken;
            return session;
        },
    },
    pages: {
        signIn: "/authenticate",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };