import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "./LayoutWrapper";
import { AdminRouteProtection } from "@/components/AdminRouteProtection";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fast Food Lahore - Premium Pizza, Shawarma & Burger Shop",
  description:
    "Discover delicious pizzas, shawarmas, burgers and fast food items handcrafted with love. Order online for delivery or pickup in Lahore.",
  keywords:
    "fast food, pizza, shawarma, burger, Lahore, online ordering, pizza delivery, shawarma delivery",
  authors: [{ name: "Fast Food Lahore" }],
  robots: "index, follow",
  openGraph: {
    title: "Fast Food Lahore - Premium Pizza, Shawarma & Burger Shop",
    description:
      "Discover delicious pizzas, shawarmas, burgers and fast food items handcrafted with love.",
    type: "website",
    locale: "en_US",
    siteName: "Fast Food Lahore",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fast Food Lahore - Premium Pizza, Shawarma & Burger Shop",
    description:
      "Discover delicious pizzas, shawarmas, burgers and fast food items handcrafted with love.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#7B3F00" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FAF3E8]`}
      >
        <AdminRouteProtection>
          <LayoutWrapper>{children}</LayoutWrapper>
        </AdminRouteProtection>
      </body>
    </html>
  );
}
