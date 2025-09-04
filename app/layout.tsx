import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

import NavBar from "@/components/NavBar";
import ModalProvider from "@/providers/ModalProvider";

export const metadata: Metadata = {
  title: "Micah Tid",
  description: "Personal portfolio showcasing my work and skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Analytics/>
      <body
        className={`antialiased`}
      >
          <div className="w-full h-[15px]" />
          <ModalProvider />
          <NavBar />
          {children}
      </body>
    </html>
  );
}

// import { Analytics } from '@vercel/analytics/next';
// <Analytics />