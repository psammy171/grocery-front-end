import type { Metadata } from "next";
import { Cabin } from "next/font/google";
import "../globals.css";
import Header from "./header";
import { Toaster } from "react-hot-toast";
import Session from "./session-provider";

const fontFamily = Cabin({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontFamily.className}>
        <Header />
        <Session>
          <div className="container mx-auto px-1">{children}</div>
        </Session>
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
