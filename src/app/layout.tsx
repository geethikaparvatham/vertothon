import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StateProvider } from "@/context/StateContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vertothon | Build. Connect. Create. Impact.",
  description: "Vertothon is a technology-driven community empowering students, developers, creators, and innovators through hackathons, workshops, meetups, bootcamps, and real-world opportunities.",
};

import NetworkBackground from "@/components/NetworkBackground";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full flex flex-col bg-[#030303] text-[#f4f4f5] antialiased relative">
        <StateProvider>
          <NetworkBackground />
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
        </StateProvider>
      </body>
    </html>
  );
}
