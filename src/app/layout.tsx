import type { Metadata } from "next";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  icons: {
    icon: "/logo.png",
  },
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
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
