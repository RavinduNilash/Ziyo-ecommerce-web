import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ziyo E-commerce",
  description: "Modern e-commerce template built with Next.js and Firebase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
