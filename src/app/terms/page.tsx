import type { Metadata } from 'next';
import styles from '@/app/legal-pages.module.css';

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'legal@santiagotosini.com';

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
                <p className={styles.meta}>Última actualización: 2 de julio de 2026</p>
                <p className={styles.lead}>
                    Estos términos regulan el uso de la aplicación <strong>Santiago Tosini Media Kit</strong>, disponible
                    en https://www.santiagotosini.com.
                </p>

                <div className={styles.content}>
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>1. Aceptación de términos</h2>
                        <p className={styles.sectionText}>
                            Al acceder o usar esta aplicación aceptás estos términos, la Política de Privacidad y las
                            condiciones de las plataformas de terceros integradas (incluida TikTok).
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>2. Descripción del servicio</h2>
                        <p className={styles.sectionText}>
                            Santiago Tosini Media Kit muestra información pública y métricas de redes sociales para
                            fines informativos, comerciales y de análisis de performance de contenido.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>3. Elegibilidad y cuentas conectadas</h2>
                        <p className={styles.sectionText}>
                            Quien conecta una cuenta declara tener autorización para hacerlo y para compartir los datos
                            necesarios con esta aplicación mediante OAuth.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>4. Integración TikTok y permisos</h2>
                        <p className={styles.sectionText}>
                            Para funcionar con TikTok, la aplicación puede solicitar los siguientes scopes:
                        </p>
                        <ul className={styles.sectionList}>
                            <li className={styles.sectionListItem}>
                                <strong>user.info.basic</strong>: identificación de la cuenta (open_id, avatar y nombre).
                            </li>
                            <li className={styles.sectionListItem}>
                                <strong>user.info.stats</strong>: estadísticas agregadas de cuenta.
                            </li>
                            <li className={styles.sectionListItem}>
                                <strong>video.list</strong>: acceso al listado de videos públicos para visualización.
                            </li>
                        </ul>
                        <p className={styles.sectionText}>
                            La disponibilidad de estos datos depende de TikTok y de la autorización vigente del usuario.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>5. Uso permitido y prohibiciones</h2>
                        <p className={styles.sectionText}>
                            Aceptás usar el servicio de manera lícita. Está prohibido:
                        </p>
                        <ul className={styles.sectionList}>
                            <li className={styles.sectionListItem}>
                                intentar acceder a sistemas, endpoints o datos sin autorización,
                            </li>
                            <li className={styles.sectionListItem}>
                                interferir con la seguridad, estabilidad o disponibilidad del servicio,
                            </li>
                            <li className={styles.sectionListItem}>
                                usar datos del servicio para fines ilícitos o en violación de derechos de terceros.
                            </li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>6. Propiedad intelectual</h2>
                        <p className={styles.sectionText}>
                            El contenido de este sitio, salvo que se indique lo contrario, pertenece a su titular y no
                            puede reproducirse sin autorización.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>7. Servicios de terceros</h2>
                        <p className={styles.sectionText}>
                            Parte de la información mostrada proviene de plataformas externas (por ejemplo TikTok,
                            YouTube e Instagram). No controlamos su disponibilidad, cambios de API o políticas.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>8. Suspensión y finalización</h2>
                        <p className={styles.sectionText}>
                            Podemos suspender o limitar acceso ante uso indebido, riesgo de seguridad o incumplimiento
                            de estos términos o de políticas de proveedores integrados.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>9. Limitación de responsabilidad</h2>
                        <p className={styles.sectionText}>
                            Este sitio se ofrece &quot;tal cual&quot;, sin garantías de disponibilidad ininterrumpida ni de
                            exactitud absoluta de la información mostrada.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>10. Cambios del servicio y de los términos</h2>
                        <p className={styles.sectionText}>
                            Podemos actualizar funcionalidades y estos términos para reflejar cambios legales, técnicos
                            o de negocio. La versión vigente estará publicada en esta URL.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>11. Ley aplicable y jurisdicción</h2>
                        <p className={styles.sectionText}>
                            Estos términos se interpretan según la normativa aplicable al titular del sitio. Cualquier
                            conflicto se resolverá ante la jurisdicción competente que corresponda.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>12. Contacto legal</h2>
                        <p className={styles.sectionText}>
                            Consultas legales o de cumplimiento: {' '}
                            <a className={styles.link} href={`mailto:${CONTACT_EMAIL}`}>
                                {CONTACT_EMAIL}
                            </a>
                            .
                        </p>
                    </section>
                </div>
            </article>
        </main>
    );
}
