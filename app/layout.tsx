import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { AuthProvider } from "@/lib/auth-context";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: {
    default: "hydrolink-BTP - Solutions durables en BTP, hydraulique et commerce",
    template: "%s | hydrolink-BTP"
  },
  description: "Entreprise multidisciplinaire basée à Niamey, Niger. Spécialisée en génie civil & BTP, hydraulique, e-commerce et commerce général. Solutions durables pour le développement du Niger.",
  keywords: ["BTP Niger", "Génie civil Niamey", "Forage puits Niger", "AEP Niger", "E-commerce Niger", "Entreprise travaux publics Niger"],
  authors: [{ name: "hydrolink-BTP" }],
  creator: "hydrolink-BTP",
  publisher: "hydrolink-BTP",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://hydrolink-btp.com"),
  alternates: {
    canonical: "/",
    languages: {
      "fr": "/",
      "en": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_NE",
    url: "https://hydrolink-btp.com",
    title: "hydrolink-BTP - Solutions durables en BTP, hydraulique et commerce",
    description: "Entreprise multidisciplinaire basée à Niamey, Niger. Spécialisée en génie civil & BTP, hydraulique, e-commerce et commerce général.",
    siteName: "hydrolink-BTP",
  },
  twitter: {
    card: "summary_large_image",
    title: "hydrolink-BTP - Solutions durables",
    description: "Entreprise multidisciplinaire basée à Niamey, Niger",
    creator: "@hydrolinkbtp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
