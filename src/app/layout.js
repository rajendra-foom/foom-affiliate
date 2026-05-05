import { Poppins } from "next/font/google";
import NextAuthProvider from "@/app/(dashboard)/components/NextAuthProvider";
import QueryProvider from "@/app/(dashboard)/components/QueryProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Foom Affiliate",
  description: "Kelola kode affiliate dan pantau komisi kamu.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${poppins.className}`}>
        <NextAuthProvider>
          <QueryProvider>{children}</QueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
