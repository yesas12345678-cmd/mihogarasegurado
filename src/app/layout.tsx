import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import CookieBanner from "@/components/CookieBanner";
import { syncUploads } from "@/lib/syncUploads";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
 });

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mi Hogar Asegurado | Información Independiente de Seguros de Hogar",
  description: "Tu portal de información imparcial y honesto sobre seguros de hogar. Analizamos coberturas, comparativas, guías y tipos de vivienda sin fines comerciales.",
  keywords: ["seguro de hogar", "coberturas de hogar", "comparativas seguros", "guia de seguros", "seguro de vivienda"],
  authors: [{ name: "Equipo Editorial de Mi Hogar Asegurado" }],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Sync static uploads at startup
  syncUploads().catch(console.error);

  return (
    <html
      lang="es"
      className={`${outfit.variable} ${inter.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
