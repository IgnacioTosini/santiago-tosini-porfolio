"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { IoLogoInstagram, IoLogoYoutube } from 'react-icons/io';
import { animateFooter } from '@/components/animations/gsap/footerAnimations';
import { IoLogoTiktok } from 'react-icons/io5';
import './_footer.scss';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      animateFooter(footerRef.current!);
    }, footerRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="footer">
      <div className='footerContent'>
        <div className='footerContentInfo'>
          <h1>© 2026 Santi Tosini. Todos los derechos reservados.</h1>
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
