"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { IoLogoInstagram } from 'react-icons/io';
import { animateFooter } from '@/components/animations/gsap/footerAnimations';
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
          <a href="https://www.instagram.com/catalinatorrespiquin/" target="_blank" rel="noopener noreferrer" className='instagramLink'>
            <IoLogoInstagram />
          </a>
        </div>
      </div>
      <div className='footerContentFooter'>
        <p>Diseñado por Ignacio Tosini</p>
      </div>
    </footer>
  )
}
