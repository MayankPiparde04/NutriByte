"use client";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

// Metadata needs to be in a separate file for client components
// or moved to a static metadata object if not using app dir

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
    <html lang="en">
      <head>
        <title>NutriByte - Your Personal Nutrition Assistant</title>
        <meta name="description" content="Your personal nutrition assistant" />
      </head>
      <body className="flex flex-col min-h-screen">
        {!isAuthPage && <Navbar />}
        <main className="flex-1">{children}</main>
        {!isAuthPage && <Footer />}
      </body>
    </html>
  );
}
