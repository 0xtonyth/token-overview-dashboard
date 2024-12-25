import type { Metadata } from "next";
import { headers } from "next/headers";
import localFont from "next/font/local";

import Providers from "@/app/providers";
import Layout from "@/components/layout/layout";

import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";

const geistSans = localFont({
  src: "../../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Token Dashboard — For crypto token overview",
  description:
    "Crypto token overview dashboard, get Ethereum tokens and pools overview",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = headers().get("cookie");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-primary_background antialiased`}
      >
        <Providers cookie={cookie}>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
