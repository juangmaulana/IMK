import type { Metadata } from "next";
import { Nunito_Sans, Outfit } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FINLIT",
  description: "Platform edukasi finansial untuk belajar mengenali pinjol ilegal dan penipuan digital.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${nunitoSans.variable} ${outfit.variable} h-full antialiased`}>
      <body className="min-h-screen bg-background text-foreground">{children}</body>
    </html>
  );
}
