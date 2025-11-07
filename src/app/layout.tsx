import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Aesthetica Fitness Coaching | Strength in Form",
  description:
    "Build a powerful, aesthetic physique that fits real life. Personalized programs, 1:1 coaching, and sustainable systems for long-term progress.",
  openGraph: {
    title: "Aesthetica Fitness Coaching | Strength in Form",
    description:
      "Premium online training to sculpt your best physique — strong, balanced, and confident.",
    url: "https://yourdomain.com",
    siteName: "Aesthetica Fitness Coaching",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Aesthetica Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
