# Configuración de TikTok con Apify

La integración ejecuta `clockworks/tiktok-profile-scraper` una vez por semana y limita cada ejecución a un perfil y un resultado.

## 1. Preparar Apify

1. Creá una cuenta gratuita en [Apify](https://console.apify.com/sign-up).
2. Abrí [TikTok Profile Scraper](https://apify.com/clockworks/tiktok-profile-scraper) y aceptá sus condiciones con **Try for free**.
3. En Apify, abrí **Settings > Integrations** y copiá tu API token.

No hace falta crear una tarea ni un schedule en Apify: Vercel inicia directamente el Actor con los límites definidos por el proyecto.

## 2. Variables de entorno

Agregá estas variables en **Vercel > Project > Settings > Environment Variables**:

```bash
APIFY_API_TOKEN=tu_token_de_apify
CRON_SECRET=una_cadena_aleatoria_de_al_menos_32_caracteres
```

Estas variables son opcionales porque el proyecto ya contiene los valores correctos por defecto:

```bash
APIFY_TIKTOK_USERNAME=santiagotosini
APIFY_TIKTOK_ACTOR_ID=clockworks~tiktok-profile-scraper
```

Usá las variables únicamente en entornos del servidor. Nunca agregues el prefijo `NEXT_PUBLIC_` al token o al secreto.

## 3. Desplegar y ejecutar por primera vez

Volvé a desplegar el proyecto para registrar las variables y el cron de `vercel.json`. Vercel ejecutará `/api/tiktok/sync` cada lunes a las 09:00 UTC (06:00 de Argentina).

Para cargar los datos inmediatamente después del despliegue, llamá una sola vez al endpoint protegido:

```powershell
$headers = @{ Authorization = "Bearer TU_CRON_SECRET" }
Invoke-RestMethod -Uri "https://TU_DOMINIO/api/tiktok/sync" -Headers $headers
```

La respuesta indica que la ejecución comenzó. El resultado normalmente estará disponible en el portfolio unos minutos después; el endpoint público se mantiene en caché durante una hora.

## 4. Comprobar que funciona

Abrí estos endpoints en el dominio desplegado:

- `/api/tiktok/status`: debe mostrar `configured: true`, `dataAvailable: true` y `latestRun.status: "SUCCEEDED"`.
- `/api/tiktok/analytics/insights`: debe mostrar `source: "live"`, `provider: "apify"` y `apifyConfigured: true`.

Consultar estos endpoints no inicia el scraper ni genera un nuevo resultado facturable. Si `configured` es `false`, falta `APIFY_API_TOKEN` en ese entorno. Si está configurado pero `dataAvailable` es `false`, ejecutá una sincronización inicial y volvé a consultar el estado unos minutos después.

## Límites de consumo aplicados

- Un perfil por ejecución.
- Un resultado facturable como máximo (`maxItems=1`).
- Sin archivos de video, portadas, avatares, subtítulos, comentarios ni listas de seguidores descargadas.
- Una ejecución semanal.
- Las visitas al portfolio leen solamente los campos necesarios del último resultado exitoso y no ejecutan el scraper.

Si Apify no tiene todavía una ejecución exitosa o devuelve un error, el sitio muestra que no hay datos disponibles en lugar de publicar cifras antiguas.
