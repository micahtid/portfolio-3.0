import type { Metadata } from "next";
import "./globals.css";

import Cursor from "@/components/Cursor";

export const metadata: Metadata = {
  title: "Micah's Portfolio",
  description: "Personal portfolio showcasing my work and skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
          {/* <Cursor>
              {children}
          </Cursor> */}
          {children}
      </body>
    </html>
  );
}
