import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Creator It Festival | Home",
  description: "Home page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
