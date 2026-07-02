"use client";

import Link from 'next/link';
import { useRef } from 'react';
import { IoLogoInstagram, IoLogoYoutube } from 'react-icons/io';
import { IoLogoTiktok } from 'react-icons/io5';
import { useGsapAnimation } from '@/hooks/useGsapAnimation';
import './_footer.scss';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGsapAnimation(footerRef, async () => {
    const { animateFooter } = await import('@/components/animations/gsap/footerAnimations');
    return animateFooter;
  }, []);

  return (
    <footer ref={footerRef} className="footer">
      <div className='footerContent'>
        <div className='footerContentInfo'>
          <h1>© {new Date().getFullYear()} Santi Tosini. Todos los derechos reservados.</h1>
          <div className='footerLegalLinks'>
            <Link href="/privacy">Política de Privacidad</Link>
            <Link href="/terms">Términos de Servicio</Link>
          </div>
        </div>

        <div className='footerContentInfoLinks'>
          <a href="https://www.instagram.com/santii_tosini/" target="_blank" rel="noopener noreferrer" className='instagramLink'>
            <IoLogoInstagram />
          </a>
          <a href="https://www.youtube.com/@santiagotosini" target="_blank" rel="noopener noreferrer" className='youtubeLink'>
            <IoLogoYoutube />
          </a>
          <a href="https://www.tiktok.com/@santiagotosini?lang=es-419" target="_blank" rel="noopener noreferrer" className='tiktokLink'>
            <IoLogoTiktok />
          </a>
        </div>
      </div>
      <div className='footerContentFooter'>
        <p>Diseñado por Ignacio Tosini</p>
      </div>
    </footer>
  )
}
