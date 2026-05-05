export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/((?!authenticate|api/auth|_next|favicon.ico|public).*)"],
};
