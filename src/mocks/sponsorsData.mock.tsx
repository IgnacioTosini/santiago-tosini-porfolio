import Image from "next/image";
import type { ReactNode } from "react";

export interface Sponsor {
    name: string;
    logoUrl: ReactNode | string;
}

export const sponsorsData: Sponsor[] = [
    {
        name: "AZTK Arena",
        logoUrl: <Image src="/sponsors/aztk.jpg" alt="AZTK Arena logo" width={150} height={150} />,
    },
    {
        name: "Baum",
        logoUrl: <Image src="/sponsors/baum.jpg" alt="Baum logo" width={150} height={150} />,
    },
    {
        name: "Canal 8",
        logoUrl: <Image src="/sponsors/canal8.png" alt="Canal 8 logo" width={150} height={150} />,
    },
    {
        name: "DOLA",
        logoUrl: <Image src="/sponsors/dola.png" alt="DOLA logo" width={150} height={150} />,
    },
    {
        name: "FAVA",
        logoUrl: <Image src="/sponsors/fava.jpg" alt="FAVA logo" width={150} height={150} />,
    },
    {
        name: "Flecha Bus",
        logoUrl: <Image src="/sponsors/flechaBus.png" alt="Flecha Bus logo" width={150} height={150} />,
    },
    {
        name: "Futbol Store",
        logoUrl: <Image src="/sponsors/futbolStore.png" alt="Futbol Store logo" width={150} height={150} />,
    },
    {
        name: "Giunti",
        logoUrl: <Image src="/sponsors/giunti.png" alt="Giunti logo" width={150} height={150} />,
    },
    {
        name: "Heineken",
        logoUrl: <Image src="/sponsors/heineken.png" alt="Heineken logo" width={150} height={150} />,
    },
    {
        name: "Mercado Libre",
        logoUrl: <Image src="/sponsors/mercadoLibre.png" alt="Mercado Libre logo" width={150} height={150} />,
    },
    {
        name: "MG",
        logoUrl: <Image src="/sponsors/mg.png" alt="MG logo" width={150} height={150} />,
    },
    {
        name: "Newbery",
        logoUrl: <Image src="/sponsors/newbery.jpg" alt="Newbery logo" width={150} height={150} />,
    },
    {
        name: "Nike",
        logoUrl: <Image src="/sponsors/nike.jpg" alt="Nike logo" width={150} height={150} />,
    },
    {
        name: "Pampa Films",
        logoUrl: <Image src="/sponsors/pampaFilms.jpg" alt="Pampa Films logo" width={150} height={150} />,
    },
    {
        name: "RIPSA",
        logoUrl: <Image src="/sponsors/ripsa.jpg" alt="RIPSA logo" width={150} height={150} />,
    },
    {
        name: "Tifox",
        logoUrl: <Image src="/sponsors/tifox.png" alt="Tifox logo" width={150} height={150} />,
    },
    {
        name: "Vibra Arena",
        logoUrl: <Image src="/sponsors/vibraArena.png" alt="Vibra Arena logo" width={150} height={150} />,
    },
    {
        name: "Kentucky",
        logoUrl: <Image src="/sponsors/kentucky.png" alt="Kentucky logo" width={150} height={150} />,
    },
    {
        name: "Sponsor Nuevo",
        logoUrl: <Image src="/sponsors/WhatsApp Image 2026-03-30 at 1.24.13 PM.png" alt="Sponsor nuevo logo" width={150} height={150} />,
    },
    {
        name: "Zizou Mates",
        logoUrl: <Image src="/sponsors/zizou.jpg" alt="Zizou Mates logo" width={150} height={150} />,
    },
];