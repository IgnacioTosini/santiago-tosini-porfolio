import type { Metadata } from 'next';
import styles from '@/app/legal-pages.module.css';

export const metadata: Metadata = {
    title: 'Política de Privacidad',
    description: 'Política de privacidad de Santiago Tosini Media Kit y tratamiento de datos de integraciones sociales.',
    alternates: {
        canonical: '/privacy',
    },
};

export default function PrivacyPage() {
    return (
        <main className={styles.page}>
            <article className={styles.container}>
                <span className={styles.badge}>Legal</span>
                <h1 className={styles.title}>Política de Privacidad</h1>
                <p className={styles.meta}>Última actualización: 26 de marzo de 2026</p>
                <p className={styles.lead}>
                    Esta política aplica a la aplicación <strong>Santiago Tosini Media Kit</strong>, disponible en
                    https://www.santiagotosini.com.
                </p>

                <div className={styles.content}>
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>1. Datos que se procesan</h2>
                        <p className={styles.sectionText}>
                            Santiago Tosini Media Kit puede procesar datos técnicos mínimos (por ejemplo, registros de
                            servidor) y métricas de redes sociales autorizadas por el titular de la cuenta conectada.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>2. Finalidad</h2>
                        <p className={styles.sectionText}>
                            Los datos se usan exclusivamente para mostrar estadísticas y análisis de rendimiento dentro
                            del panel del sitio.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>3. Base de acceso a APIs</h2>
                        <p className={styles.sectionText}>
                            El acceso a datos de plataformas de terceros se realiza mediante OAuth y permisos explícitos
                            otorgados por el usuario.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>4. Compartición de datos</h2>
                        <p className={styles.sectionText}>
                            No se venden datos personales ni se comparten con terceros fuera de lo necesario para
                            operar el servicio.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>5. Seguridad</h2>
                        <p className={styles.sectionText}>
                            Se aplican medidas razonables para proteger la información y credenciales, incluyendo
                            almacenamiento en variables de entorno y acceso restringido.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>6. Derechos y contacto</h2>
                        <p className={styles.sectionText}>
                            Si querés solicitar actualización o eliminación de datos vinculados a esta integración,
                            podés hacerlo mediante el formulario de contacto del sitio.
                        </p>
                    </section>
                </div>
            </article>
        </main>
    );
}
