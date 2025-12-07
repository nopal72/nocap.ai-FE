import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Metadata, Viewport } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NOCAP.AI - Better Caption, No Cap",
  description:
    "NOCAP.AI leverages advanced AI to analyze your code, identify vulnerabilities, and suggest improvements for enhanced security and performance.",
  icons: {
    icon: "/favicon-dark.webp",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
} 
