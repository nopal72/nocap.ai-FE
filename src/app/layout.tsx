import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MSWComponent } from "@/components/MSWComponent";
import { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NOCAP.AI - Better Caption, No Cap",
  description:
    "NOCAP.AI leverages advanced AI to analyze your code, identify vulnerabilities, and suggest improvements for enhanced security and performance.",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  icons: {
    icon: "/favicon-dark.webp",
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
        <MSWComponent>{children}</MSWComponent>
      </body>
    </html>
  );
} 
