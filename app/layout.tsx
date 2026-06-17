import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const titre = "TetouanScoot — Location de scooters à Tétouan";
const description =
  "Louez un scooter à Tétouan en toute simplicité : réservation en ligne, paiement et caution sur place.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: titre,
    template: "%s",
  },
  description,
  openGraph: {
    title: titre,
    description,
    url: siteUrl,
    siteName: "TetouanScoot",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: titre,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
