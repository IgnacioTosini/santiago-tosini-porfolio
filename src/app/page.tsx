import { About } from "@/components/sections/About/About";
import { Audience } from "@/components/sections/Audience/Audience";
import { Contact } from "@/components/sections/Contact/Contact";
import { Content } from "@/components/sections/Content/Content";
import { Hero } from "@/components/sections/Hero/Hero";
import { Numbers } from "@/components/sections/Numbers/Numbers";
import { Service } from "@/components/sections/Service/Service";

export default function Home() {
  return (
    <main>
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
