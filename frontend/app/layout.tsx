import type { Metadata } from "next";
import { Inter_Tight, Anton } from "next/font/google";
import "./globals.css";
import Nav from "@/components/local/Nav";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter_Tight({
  variable: "--font-inter",
  weight: ["600", "400", "300"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "AI Quizer",
  description: "AI-powered quiz app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${anton.variable} antialiased bg-background overflow-x-hidden`}
      >
        <Nav />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
