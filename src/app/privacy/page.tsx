import type { Metadata } from 'next';
import styles from '@/app/legal-pages.module.css';

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'legal@santiagotosini.com';

export const metadata: Metadata = {
    title: 'Política de Privacidad',
    description: 'Política de privacidad de Santiago Tosini y tratamiento de datos de integraciones sociales.',
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
                <p className={styles.meta}>Última actualización: 2 de julio de 2026</p>
                <p className={styles.lead}>
                    Esta política aplica a la aplicación <strong>Santiago Tosini</strong>, disponible en
                    https://www.santiagotosini.com.
                </p>

                <div className={styles.content}>
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>1. Responsable y alcance</h2>
                        <p className={styles.sectionText}>
                            El responsable del tratamiento de datos de esta aplicación es el titular de Santiago Tosini
                            Media Kit. Esta política describe qué información se procesa cuando una persona visita el
                            sitio y/o conecta su cuenta de TikTok para visualizar estadísticas en el panel.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>2. Datos que se recopilan</h2>
                        <p className={styles.sectionText}>
                            Procesamos únicamente la información necesaria para operar el servicio.
                        </p>
                        <ul className={styles.sectionList}>
                            <li className={styles.sectionListItem}>
                                Datos de autenticación OAuth y tokens técnicos para mantener la conexión con APIs.
                            </li>
                            <li className={styles.sectionListItem}>
                                Datos de perfil autorizados por la persona usuaria en TikTok.
                            </li>
                            <li className={styles.sectionListItem}>
                                Métricas de cuenta y listado de videos públicos, según los permisos otorgados.
                            </li>
                            <li className={styles.sectionListItem}>
                                Registros técnicos mínimos (logs de servidor, fecha/hora y errores) para seguridad y
                                diagnóstico.
                            </li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>3. Permisos TikTok solicitados y uso</h2>
                        <p className={styles.sectionText}>
                            Cuando conectás TikTok, se solicitan estos scopes y se usan exclusivamente para:
                        </p>
                        <ul className={styles.sectionList}>
                            <li className={styles.sectionListItem}>
                                <strong>user.info.basic</strong>: leer open_id, avatar, display name y datos básicos del
                                perfil para identificar la cuenta conectada.
                            </li>
                            <li className={styles.sectionListItem}>
                                <strong>user.info.stats</strong>: obtener métricas agregadas de cuenta (likes, seguidores,
                                seguidos, cantidad de videos).
                            </li>
                            <li className={styles.sectionListItem}>
                                <strong>video.list</strong>: obtener listado de videos públicos para analítica y
                                visualización interna.
                            </li>
                        </ul>
                        <p className={styles.sectionText}>
                            No solicitamos permisos distintos a los necesarios para estas finalidades.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>4. Finalidades y base de tratamiento</h2>
                        <p className={styles.sectionText}>
                            Tratamos datos para autenticar cuentas, mostrar analítica, mantener la seguridad y cumplir
                            obligaciones legales. La base principal es el consentimiento otorgado al conectar cuentas
                            y la necesidad técnica de operar la aplicación solicitada por la persona usuaria.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>5. Conservación de datos</h2>
                        <p className={styles.sectionText}>
                            Conservamos los datos solo durante el tiempo necesario para prestar el servicio, resolver
                            incidencias técnicas y cumplir obligaciones legales. Si la conexión se revoca o se solicita
                            eliminación, se procede al borrado o anonimización en un plazo razonable, salvo obligación
                            legal en contrario.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>6. Compartición con terceros</h2>
                        <p className={styles.sectionText}>
                            No vendemos datos personales. Solo compartimos datos cuando es necesario para operar la
                            aplicación (por ejemplo, proveedores de hosting o infraestructura) bajo medidas de
                            confidencialidad y seguridad.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>7. Transferencias internacionales</h2>
                        <p className={styles.sectionText}>
                            Algunos proveedores tecnológicos pueden procesar datos en distintas jurisdicciones. En esos
                            casos, se aplican salvaguardas razonables para proteger la información conforme normativa
                            aplicable.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>8. Seguridad</h2>
                        <p className={styles.sectionText}>
                            Aplicamos medidas técnicas y organizativas razonables: control de acceso, almacenamiento
                            restringido de credenciales, uso de variables de entorno y monitoreo de incidentes.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>9. Derechos de las personas usuarias</h2>
                        <p className={styles.sectionText}>
                            Podés solicitar acceso, rectificación, actualización, portabilidad o eliminación de tus
                            datos, y también revocar consentimiento para el procesamiento asociado a la integración.
                        </p>
                        <p className={styles.sectionText}>
                            Para ejercer derechos, escribí a{' '}
                            <a className={styles.link} href={`mailto:${CONTACT_EMAIL}`}>
                                {CONTACT_EMAIL}
                            </a>
                            .
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>10. Revocación y eliminación de datos de TikTok</h2>
                        <p className={styles.sectionText}>
                            Si querés dejar de compartir datos con esta app, podés revocar el acceso desde la
                            configuración de TikTok y solicitar eliminación de datos a través del email de contacto.
                            Una vez verificada la solicitud, eliminaremos los datos asociados en nuestros sistemas
                            dentro de un plazo razonable.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>11. Menores de edad</h2>
                        <p className={styles.sectionText}>
                            Esta aplicación no está dirigida a menores de 13 años. Si detectamos tratamiento de datos
                            de menores sin base válida, los eliminaremos.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>12. Cambios a esta política</h2>
                        <p className={styles.sectionText}>
                            Podemos actualizar esta política para reflejar cambios legales, técnicos o de producto. La
                            versión vigente estará siempre publicada en esta misma URL con su fecha de actualización.
                        </p>
                    </section>
                </div>
            </article>
        </main>
    );
}
