import type { Metadata } from "next";
import { About } from "@/components/sections/About/About";
import { Audience } from "@/components/sections/Audience/Audience";
import { Contact } from "@/components/sections/Contact/Contact";
import { Content } from "@/components/sections/Content/Content";
import { Hero } from "@/components/sections/Hero/Hero";
import { Numbers } from "@/components/sections/Numbers/Numbers";
import { Service } from "@/components/sections/Service/Service";

const DEFAULT_SITE_URL = "https://santiagotosini.com";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;

export const metadata: Metadata = {
  title: "Inicio",
  description:
    "Conocé a Santiago Tosini: contenido deportivo, métricas de audiencia y oportunidades de colaboración.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Santiago Tosini | Portfolio Oficial",
    description:
      "Contenido destacado, métricas de audiencia y servicios de colaboración.",
    url: "/",
    images: ["/fotoPerfilSantiTosini.jpeg"],
  },
};

export default function Home() {
  const personStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Santiago Tosini",
    url: SITE_URL,
    image: `${SITE_URL}/fotoPerfilSantiTosini.jpeg`,
    jobTitle: "Creador de contenido deportivo",
    sameAs: [
      "https://www.instagram.com/santii_tosini/",
      "https://www.tiktok.com/@santiagotosini?lang=es-419",
      "https://www.youtube.com/@santiagotosini",
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }}
      />
      <Hero />
      <Content />
      <About />
      <Numbers />
      <Audience />
      <Service />
      <Contact />
    </main>
  );
}
