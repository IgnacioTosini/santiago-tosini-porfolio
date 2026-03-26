export const metadata = {
    title: 'Política de Privacidad | Santiago Tosini',
};

export default function PrivacyPage() {
    return (
        <main style={{ maxWidth: 900, margin: '0 auto', padding: '48px 20px', lineHeight: 1.6 }}>
            <h1>Política de Privacidad</h1>
            <p>Última actualización: 26 de marzo de 2026</p>

            <h2>1. Datos que se procesan</h2>
            <p>
                Este sitio puede procesar datos técnicos mínimos (por ejemplo, registros de servidor) y métricas de
                redes sociales autorizadas por el titular de la cuenta conectada.
            </p>

            <h2>2. Finalidad</h2>
            <p>
                Los datos se usan exclusivamente para mostrar estadísticas y análisis de rendimiento dentro del panel
                del sitio.
            </p>

            <h2>3. Base de acceso a APIs</h2>
            <p>
                El acceso a datos de plataformas de terceros se realiza mediante OAuth y permisos explícitos otorgados
                por el usuario.
            </p>

            <h2>4. Compartición de datos</h2>
            <p>No se venden datos personales ni se comparten con terceros fuera de lo necesario para operar el servicio.</p>

            <h2>5. Seguridad</h2>
            <p>
                Se aplican medidas razonables para proteger la información y credenciales, incluyendo almacenamiento en
                variables de entorno y acceso restringido.
            </p>

            <h2>6. Derechos y contacto</h2>
            <p>
                Si querés solicitar actualización o eliminación de datos vinculados a esta integración, podés hacerlo
                mediante el formulario de contacto del sitio.
            </p>
        </main>
    );
}
