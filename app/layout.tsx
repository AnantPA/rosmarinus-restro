import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const display = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Rosmarinus Restro · Pure vegetarian dining in Pal Gam, Surat",
  description: site.description,
  openGraph: {
    title: "Rosmarinus Restro, Pal Gam, Surat",
    description: site.description,
    images: [{ url: "/images/table.jpg", width: 710, height: 850, alt: "A table set for eight beside the garden at Rosmarinus Restro" }],
    locale: "en_IN",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBFBF9" },
    { media: "(prefers-color-scheme: dark)", color: "#121414" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
