import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import { FootballBackground } from "@/components/decor/FootballBackground";
import { initializeServer } from "@/lib/server-init";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Santiago Tosini - Portfolio",
  description: "Portfolio de Santiago Tosini, creador de contenido argentino con más de 100k seguidores en Instagram, 200k en TikTok y 425k suscriptores en YouTube. Descubre su trabajo, servicios y cómo contactarlo.",
  icons: {
    icon: "/fotoPerfilSantiTosini.jpeg",
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
        <FootballBackground />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
