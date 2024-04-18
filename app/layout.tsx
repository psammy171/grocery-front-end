import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Session from "./session-provider";

const fontFamily = Outfit({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Grocery Store",
  description: "Order grocery items with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontFamily.className}>
        <Session>{children}</Session>
        <Toaster
          position="top-right"
          toastOptions={{
            className: "min-w-[250px]",
          }}
        />
      </body>
    </html>
  );
}
