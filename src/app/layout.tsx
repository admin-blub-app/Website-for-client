import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SplashScreen from "@/components/SplashScreen";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Snatch On | Book brilliant creatives",
    template: "%s | Snatch On",
  },
  description:
    "Snatch On is the marketplace where photographers, designers and creatives of every kind get discovered, booked and paid. Find your creative, book in minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}
