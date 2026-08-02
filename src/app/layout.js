import { Nunito } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

const nunito = Nunito({
    subsets: ["latin"],
    weight: ["400", "600", "700", "800"],
});

export const metadata = {
    title: "SK Tech — Web Development & Digital Solutions",
    description:
        "SK Tech builds fast, modern websites and web apps — from portfolios to full-stack platforms with custom admin panels.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
                />
            </head>
            <body className={nunito.className}>
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}