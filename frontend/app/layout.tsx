import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import Nav from "@/components/local/Nav";

const inter = Inter_Tight({
  variable: "--font-inter",
  weight: ["600", "400", "300"],
});

export const metadata: Metadata = {
  title: "AI Quizer",
  description: "Your go to app for generating instant quiz with AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}  antialiased dark bg-background`}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
