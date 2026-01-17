import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Isaac Kargar | AI Resume Chat",
  description:
    "An AI-powered interactive resume with grounded chat, deep experience context, and fit analysis.",
  metadataBase: new URL("https://isaackargar.com"),
  openGraph: {
    title: "Isaac Kargar | AI Resume Chat",
    description:
      "Explore Isaac's work through a grounded AI chat, expandable experience context, and job-fit analysis.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Isaac Kargar | AI Resume Chat",
    description:
      "Explore Isaac's work through a grounded AI chat, expandable experience context, and job-fit analysis.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${fraunces.variable}`}>
        {children}
      </body>
    </html>
  );
}
