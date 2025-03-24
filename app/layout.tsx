import type { Metadata } from "next";
import "./globals.css";

import Cursor from "@/components/Cursor";
import ModalProvider from "@/providers/ModalProvider";

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
          <ModalProvider />
          {children}
      </body>
    </html>
  );
}
