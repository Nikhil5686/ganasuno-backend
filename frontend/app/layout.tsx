import type { Metadata } from "next";
import { Cinzel, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SupportButton from "@/components/support/support-button";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GanaSuno - Music Through The Eras",

  description:
    "GanaSuno is a nostalgic music experience where you can relive Indian songs through different eras from the 1970s to today.",
  manifest: "/manifest.webmanifest",
  verification: {
    google: "eW7TWnZJAklvSe8Gzdwra7-p5_y0LlrZrZ-QGIuFbM0",
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "GanaSuno",
  },

  metadataBase: new URL("https://ganasuno.studio"),

  keywords: [
    "GanaSuno",
    "Gana Suno",
    "Ganasuno music",
    "Indian nostalgia music",
    "old Hindi songs",
    "Bollywood classics",
    "retro songs",
    "music through eras",
  ],

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/icon.png",
  },

  openGraph: {
    title: "GanaSuno - Music Through The Eras",
    description: "Relive Indian music through every era with GanaSuno.",
    url: "https://ganasuno.studio",
    siteName: "GanaSuno",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GanaSuno - Music Through The Eras",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#120504",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <SupportButton />
      </body>
    </html>
  );
}
