import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VERVE AI — One Platform. Every Expert. Zero Switching.",
  description:
    "VERVE AI unifies Legal, Finance, Code, Creative & Medical AI specialists — plus photo & video generation — into a single intelligent platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
        <body className="antialiased">{children}</body>
      </html>
    </ClerkProvider>
  );
}
