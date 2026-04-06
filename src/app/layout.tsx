import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import { FootballBackground } from "@/components/decor/FootballBackground";
import { initializeServer } from "@/lib/server-init";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const DEFAULT_SITE_URL = "https://santiagotosini.com";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Santiago Tosini | Creador de Contenido",
    template: "%s | Santiago Tosini",
  },
  description:
    "Portfolio oficial de Santiago Tosini, creador de contenido argentino con +100k en Instagram, +200k en TikTok y +430k en YouTube.",
  keywords: [
    "Santiago Tosini",
    "creador de contenido",
    "futbol",
    "deportes",
    "marketing deportivo",
    "influencer argentino",
    "YouTube",
    "TikTok",
    "Instagram",
  ],
  authors: [{ name: "Santiago Tosini" }],
  creator: "Santiago Tosini",
  publisher: "Santiago Tosini",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    title: "Santiago Tosini | Creador de Contenido",
    description:
      "Conocé el trabajo, las métricas y los servicios de Santiago Tosini en redes sociales.",
    siteName: "Santiago Tosini",
    images: [
      {
        url: "/fotoPerfilSantiTosini.jpeg",
        width: 1200,
        height: 630,
        alt: "Santiago Tosini - Creador de Contenido",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Santiago Tosini | Creador de Contenido",
    description:
      "Portfolio oficial con métricas y contenido destacado de Santiago Tosini.",
    images: ["/fotoPerfilSantiTosini.jpeg"],
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
  icons: {
    icon: "/fotoPerfilSantiTosini.jpeg",
    apple: "/fotoPerfilSantiTosini.jpeg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await initializeServer();

  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <Providers>
          <FootballBackground />
          <Navbar />
          {children}
          <Footer />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
