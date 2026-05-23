import type { Metadata } from 'next';
import styles from '@/app/legal-pages.module.css';

export const metadata: Metadata = {
    title: 'Términos de Servicio',
    description: 'Términos de servicio de Santiago Tosini Media Kit para uso de contenido e integraciones.',
    alternates: {
        canonical: '/terms',
    },
};

export default function TermsPage() {
    return (
        <main className={styles.page}>
            <article className={styles.container}>
                <span className={styles.badge}>Legal</span>
                <h1 className={styles.title}>Términos de Servicio</h1>
                <p className={styles.meta}>Última actualización: 26 de marzo de 2026</p>
                <p className={styles.lead}>
                    Estos términos regulan el uso de la aplicación <strong>Santiago Tosini Media Kit</strong>, disponible
                    en https://www.santiagotosini.com.
                </p>

                <div className={styles.content}>
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>1. Objeto</h2>
                        <p className={styles.sectionText}>
                            Santiago Tosini Media Kit presenta información pública de audiencia y rendimiento de redes
                            sociales para fines informativos y de análisis.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>2. Uso permitido</h2>
                        <p className={styles.sectionText}>
                            Aceptás usar este sitio de forma lícita y sin intentar acceder a datos, sistemas o
                            funcionalidades no autorizadas.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>3. Integración con terceros</h2>
                        <p className={styles.sectionText}>
                            Algunas métricas provienen de APIs de terceros (por ejemplo, TikTok y YouTube). La
                            disponibilidad, precisión y continuidad dependen de dichos servicios.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>4. Propiedad intelectual</h2>
                        <p className={styles.sectionText}>
                            El contenido de este sitio, salvo que se indique lo contrario, pertenece a su titular y no
                            puede reproducirse sin autorización.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>5. Limitación de responsabilidad</h2>
                        <p className={styles.sectionText}>
                            Este sitio se ofrece &quot;tal cual&quot;, sin garantías de disponibilidad ininterrumpida ni de
                            exactitud absoluta de la información mostrada.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>6. Contacto</h2>
                        <p className={styles.sectionText}>
                            Si necesitás comunicarte por temas legales o de uso, podés hacerlo a través del formulario
                            de contacto del sitio.
                        </p>
                    </section>
                </div>
            </article>
        </main>
    );
}
