import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "your name — portfolio",
  description: "Graphic designer & CS student building wondrous things.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.variable}>
      <body
        suppressHydrationWarning
        className="bg-slate-50 text-slate-800 antialiased min-h-screen flex flex-col"
      >
        {children}
      </body>
    </html>
  );
}
